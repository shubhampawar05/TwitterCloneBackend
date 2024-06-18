const express = require('express');
const route = express.Router();

const userController = require('./../controllers/user')
const auth = require('./../middlewares/auth')

route.post('/register',userController.registerFun)
route.post('/login',userController.loginFun)
route.get('/logout',userController.logoutFun)


module.exports = route;