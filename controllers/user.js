const usersModel = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

let tokenBlacklist = [];

const registerFun = async (req, res) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !username || !password) {
    return res.status(401).json({
      ssuccess: false,
      message: "All Fields are required...",
    });
  }

  const isuserAvaliable = await usersModel.findOne({ email });
  if (isuserAvaliable) {
    return res.status(401).json({
      ssuccess: false,
      message: "Email Already Exist",
    });
  }

  const hasPassword = await bcrypt.hash(password, 10);
  const userDetails = {
    name,
    email,
    username,
    password: hasPassword,
  };

  const addedUser = new usersModel(userDetails);
  await addedUser.save();

  return res.status(201).json({
    message: "Account created successfully.",
    success: true,
  });
};

const loginFun = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      ssuccess: false,
      message: "All Fields are required...",
    });
  }
  const user = await usersModel.findOne({ email });
  //   console.log(user);

  const isValidPassword = bcrypt.compareSync(password, user.password);
  //   console.log(isValidPassword);
  if (!isValidPassword) {
    return res.status(401).json({
      ssuccess: false,
      message: "invailid email or passowrd",
    });
  }

  const payload = {
    id: user._id,
    username: user.username,
    name: user.name,
  };
  const token = jwt.sign(payload, process.env.JWTKEY, { expiresIn: "1d" });
  console.log(token);
  return res.json({
    success: true,
    message: "login sucssefull",
    token: token,
    user,
  });
};

const logoutFun = (req, res) => {
  app.post(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const token = req.headers["authorization"].split(" ")[1];
      tokenBlacklist.push(token);
      res.json({ message: "Logged out successfully" });
    }
  );
};

const bookmarkFun = async (req, res) => {
  const loggedInUserID = req.user.id;
  const tweetId = req.params.tweetId;
  const user = await usersModel.findById(loggedInUserID);
  if (user.bookmarks.includes(tweetId)) {
    // unBookmark
    await usersModel.findByIdAndUpdate(loggedInUserID, {
      $pull: { bookmarks: tweetId },
    });
    return res.status(200).json({
      message: "Removed from bookmarks.",
    });
  } else {
    // Bookmark
    await usersModel.findByIdAndUpdate(loggedInUserID, {
      $push: { bookmarks: tweetId },
    });
    return res.status(200).json({
      message: "Saved to bookmarks.",
    });
  }
};

const getUserPrfile = async (req, res) => {
  const userID = req.params.userID;
  const userData = await usersModel.findById(userID).select("-password");
  return res.status(200).json({
    userData,
  });
};

const getOthersUser = async (req, res) => {
  const loggedInUserID = req.user.id;
  const otheruserData = await usersModel
    .find({ _id: { $ne: loggedInUserID } })
    .select("-password");
  if (!otheruserData) {
    return res.status(401).json({
      message: "Currently do not have any users.",
    });
  }
  return res.status(200).json({
    otheruserData,
  });
};

const UnfollowFun = async (req, res) => {
  const loggedInUserID = req.user.id;
  const unfollowerId = req.params.unfollowerId; //jisko follow krna hai
  const loggedInUser = await usersModel.findById(loggedInUserID);
  const UnfollowerUser = await usersModel.findById(unfollowerId);
  if (loggedInUser.following.includes(unfollowerId)) {
    //agar phle  follow krta  hai to usko unfollow krna hai 
    await UnfollowerUser.updateOne({ $pull: { followers: loggedInUserID } }); // jisko follow kiya usko uske followeres me jisne follow kiya hai uski id
    await loggedInUser.updateOne({ $pull: { following: unfollowerId } }); //jisne follow kiya hai uske following me jisko follow kiya h uski id
  } else {
    return res.status(400).json({
      message:`User has not followed yet`
  })
  }

  return res.status(200).json({
    message:`${loggedInUser.name} unfollow to ${UnfollowerUser.name}`,
    success:true
})
};
const followFun = async (req, res) => {
  const loggedInUserID = req.user.id;
  const followerId = req.params.followerId; //jisko follow krna hai
  const loggedInUser = await usersModel.findById(loggedInUserID);
  const followerUser = await usersModel.findById(followerId);
  if (!followerUser.followers.includes(loggedInUserID)) {
    //agar phle se follow krta nahi hai to
    await followerUser.updateOne({ $push: { followers: loggedInUserID } }); // jisko follow kiya usko uske followeres me jisne follow kiya hai uski id
    await loggedInUser.updateOne({ $push: { following: followerId } }); //jisne follow kiya hai uske following me jisko follow kiya h uski id
  } else {
    return res.status(400).json({
      message: `User already followed to ${followerUser.name}`,
    });
  }

  return res.status(200).json({
    message:`${loggedInUser.name} just follow to ${followerUser.name}`,
    success:true
})
};
const userController = {
  registerFun,
  loginFun,
  logoutFun,
  bookmarkFun,
  getUserPrfile,
  getOthersUser,
  followFun,UnfollowFun
};

module.exports = userController;
