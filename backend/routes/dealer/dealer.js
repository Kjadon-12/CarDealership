

const express = require('express');
const { addCarsCtrl , addDealCtrl, dealerShipSold } = require('../../controllers/dealerCtrl');
const authDealer = require('../../middleware/authDealer');
const dealerRoute =  express.Router();

dealerRoute.post('/addCar' , authDealer,  addCarsCtrl)
dealerRoute.post('/addDeal' , authDealer, addDealCtrl)
dealerRoute.get('/sold' , authDealer , dealerShipSold)

module.exports = dealerRoute