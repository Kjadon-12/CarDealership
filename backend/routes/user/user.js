const express = require('express');
const userRoute = express.Router();
const { delarshipsCar, userVehicles, dealsCar} = require('../../controllers/userCtrl');
const authUser = require('../../middleware/authUser');

userRoute.get('/dealerships/:carId', authUser, delarshipsCar)
userRoute.get('/vehicles', authUser, userVehicles)
userRoute.get('/deals/:carId', authUser, dealsCar)

module.exports = userRoute