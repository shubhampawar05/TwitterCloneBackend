const express = require('express');
const route = express.Router();

const tweetController = require('./../controllers/tweet')
const auth = require('./../middlewares/auth')

route.post('/create', auth.authenticate('jwt', { session: false }), tweetController.CreateTweet)
route.post('/delete/:tweetId', auth.authenticate('jwt', { session: false }), tweetController.deleteTweet)
route.post('/like/:tweetId', auth.authenticate('jwt', { session: false }), tweetController.likeorDilike)


module.exports = route;