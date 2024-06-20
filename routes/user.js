const express = require('express');
const route = express.Router();

const userController = require('./../controllers/user')
const auth = require('./../middlewares/auth')

route.post('/register',userController.registerFun)
route.post('/login',userController.loginFun)
route.get('/logout',userController.logoutFun)
route.get('/bookmark/:tweetId',auth.authenticate('jwt', { session: false }), userController.bookmarkFun)
route.get('/profile/:userID',auth.authenticate('jwt', { session: false }), userController.getUserPrfile)
route.get('/otherUser',auth.authenticate('jwt', { session: false }), userController.getOthersUser)
route.get('/follow/:followerId',auth.authenticate('jwt', { session: false }), userController.followFun)
route.get('/UnFollow/:unfollowerId',auth.authenticate('jwt', { session: false }), userController.UnfollowFun)


module.exports = route;