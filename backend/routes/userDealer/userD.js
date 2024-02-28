const express = require('express');
const commonRoute = express.Router();
const {commonCars, dealerCars, dealershipDeals, addVehicles} = require('../../controllers/commonCtrl')

commonRoute.post('/add-vehicle', addVehicles)
commonRoute.get('/cars' , commonCars)
commonRoute.get('/cars/dealership/:dealershipId' , dealerCars);

commonRoute.get('/deals/dealership/:dealershipId' , dealershipDeals)
module.exports = commonRoute