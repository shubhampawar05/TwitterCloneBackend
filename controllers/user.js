const usersModel = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
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
    id : user._id,
    username:user.username,
    name:user.name
  }
  const token = jwt.sign(payload, process.env.JWTKEY,{expiresIn:"1d"});
  console.log(token);
  return res.json({
    success: true,
    message: "login sucssefull",
    token : token
  });
};

const logoutFun = (req, res)=>{
  app.post('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    tokenBlacklist.push(token);
    res.json({ message: 'Logged out successfully' });
});

};

const bookmark = async (req, res)=>{
const loggedInUserID = req.user.id;
const tweetId = req.params.tweetId;


}

const userController = {
  registerFun,
  loginFun,
  logoutFun
};

module.exports = userController;
