const tweetModel = require("./../models/tweet");
const usersModel = require("./../models/user");

const CreateTweet = async (req, res) => {
  console.log(req.user); // ye data jwtToken se add hua hai wo wala data hai req.user usem id:me user._id bole to user ki id dali hai
  const { description } = req.body;
  if (!description) {
    return res.status(401).json({
      message: "Fields are required.",
      success: false,
    });
  }

  const newTweet = new tweetModel({ ...req.body, userId: req.user.id });
  await newTweet.save();
  return res.status(201).json({
    message: "Tweet created successfully.",
    success: true,
  });
};

const deleteTweet = async (req, res) => {
  const { tweetId } = req.params; // ye id tweet id hogi jo tweet ko delete krna hai wo wali
  if (!tweetId) {
    return res.status(401).json({
      message: "ID is required.",
      success: false,
    });
  }

  await tweetModel.findByIdAndDelete(tweetId);
  return res.status(200).json({
    message: "Tweet deleted successfully.",
    success: true,
  });
};
const likeorDilike = async (req, res) => {
  const loggedInUserID = req.user.id;
  const tweetId = req.params.tweetId;
  const tweet = await tweetModel.findById(tweetId);
  if (tweet.like.includes(loggedInUserID)) {
    // unlike
    await tweetModel.findByIdAndUpdate(tweetId, {
      $pull: { like: loggedInUserID },
    });
    return res.status(200).json({
      message: "User disliked your tweet.",
    });
  } else {
    // like
    await tweetModel.findByIdAndUpdate(tweetId, {
      $push: { like: loggedInUserID },
    });
    return res.status(200).json({
      message: "User liked your tweet.",
    });
  }
};

const getAllTweets = async (req, res) => {
  // loggedInUser ka tweet + following user tweet
  try {
    const id = req.user.id;
    const loggedInUser = await usersModel.findById(id);
    const loggedInUserTweets = await tweetModel.find({ userId: id });
    const followingUserTweet = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return tweetModel.find({ userId: otherUsersId });
      })
    );
    return res.status(200).json({
      tweets: loggedInUserTweets.concat(...followingUserTweet),
    });
  } catch (error) {
    console.log(error);
  }
};

const getFollowingTweets = async (req, res) => {
  try {
    const id = req.user.id;
    const loggedInUser = await usersModel.findById(id);
    const followingUserTweet = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return tweetModel.find({ userId: otherUsersId });
      })
    );
    return res.status(200).json({
      tweets: [].concat(...followingUserTweet),
    });
  } catch (error) {
    console.log(error);
  }
};
const tweetController = {
  CreateTweet,
  deleteTweet,
  likeorDilike,
  getAllTweets,
  getFollowingTweets,
};
module.exports = tweetController;
