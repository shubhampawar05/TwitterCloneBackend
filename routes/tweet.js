const express = require('express');
const route = express.Router();

const tweetController = require('./../controllers/tweet')
const auth = require('./../middlewares/auth')

route.post('/create', auth.authenticate('jwt', { session: false }), tweetController.CreateTweet)
route.post('/delete/:tweetId', auth.authenticate('jwt', { session: false }), tweetController.deleteTweet)
route.post('/like/:tweetId', auth.authenticate('jwt', { session: false }), tweetController.likeorDilike)
route.get('/alltweets', auth.authenticate('jwt', { session: false }), tweetController.getAllTweets)
route.get('/followingtweets', auth.authenticate('jwt', { session: false }), tweetController.getFollowingTweets)

module.exports = route; 