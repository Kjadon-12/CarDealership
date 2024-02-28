const express = require("express");
const {
  usersCollection,
  dealershipCollection,
  dealsCollection,
  soldVehicleCollection
} = require("../config/collection");
const { ObjectId } = require("mongodb");

// Endpoint to view dealerships with a certain car
const delarshipsCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const {user} = req
    console.log(user)

    // Find dealerships with the specified car
    const dealerships = await dealershipCollection
      .find({ cars: new ObjectId(carId) }, { projection: { password: 0 , token: 0 }}  )
      .toArray();

    res.json({ dealerships });
  } catch (error) {
    console.error("Error fetching dealerships:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Endpoint to view all vehicles owned by user along with dealer info
const userVehicles = async (req, res) => {
  try {
    const { user } = req;

    // Get the list of sold vehicles owned by the user
    const ownedVehicles = await soldVehicleCollection
      .find({ user_id: user})
      .toArray();
// console.log(ownedVehicles)
    // Retrieve dealer info for each owned vehicle
    const vehiclesWithDealerInfo = await Promise.all(
      ownedVehicles.map(async (vehicle) => {
        const dealer = await dealershipCollection.findOne({
          sold_vehicles: vehicle._id,
        });
        return { ...vehicle, dealer_info: dealer };
      })
    );
    res.json({ vehicles: vehiclesWithDealerInfo });
  } catch (error) {
    console.error("Error fetching owned vehicles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Endpoint to view all deals on a certain car
const dealsCar = async (req, res) => {
  try {
    const { carId } = req.params;

    // Find deals on the specified car
    const carDeals = await dealsCollection.find({ carId: new ObjectId(carId) }).toArray();

    res.json({ deals: carDeals });
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
 
  delarshipsCar,
  userVehicles,
  dealsCar,
};
