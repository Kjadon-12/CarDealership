const express = require('express');
const { userRegisterCtrl, userLoginCtrl, dealerRegisterCtrl ,dealerLoginCtrl } = require('../../controllers/authCtrl');
const authRoute = express.Router()


authRoute.post('/user/register', userRegisterCtrl)
authRoute.post('/user/login' , userLoginCtrl)
authRoute.post('/dealer/register', dealerRegisterCtrl)
authRoute.post('/dealer/login' , dealerLoginCtrl)

module.exports = authRoute