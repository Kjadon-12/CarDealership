const {
  carsCollection,
  dealershipCollection,
  dealsCollection,
  soldVehicleCollection,
  usersCollection,
} = require("../config/collection");
const { ObjectId } = require("mongodb");
const commonCars = async (req, res) => {
  try {
    // Find all cars
    const allCars = await carsCollection.find().toArray();

    res.json({ cars: allCars });
  } catch (error) {
    console.error("Error fetching all cars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Endpoint to view all cars in a certain dealership
const dealerCars = async (req, res) => {
  try {
    const { dealershipId } = req.params;

    // Find the dealership
    const dealership = await dealershipCollection.findOne({
      _id: new ObjectId(dealershipId),
    });

    if (!dealership) {
      return res.status(404).json({ error: "Dealership not found" });
    }

    // Retrieve cars in the dealership
    const dealershipCars = await carsCollection
      .find({ _id: { $in: dealership.cars } })
      .toArray();

    res.json({ cars: dealershipCars });
  } catch (error) {
    console.error("Error fetching cars in dealership:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Endpoint to add new vehicle to the list of owned/sold vehicles
const addVehicles = async (req, res) => {
  try {
    // console.log(req)
    const { authenticatedUser, authenticatedDealer } = req;
    //   console.log(user)
    //   console.log(dealer)
    const { carId, vehicleInfo } = req.body;

    // Insert the vehicle
    const result = await soldVehicleCollection.insertOne({
      carId: carId,
      ...vehicleInfo,
      user_id: authenticatedUser ? authenticatedUser._id : null, dealer_id: authenticatedDealer ? authenticatedDealer._id : null
    });
    const vehicleId = result.insertedId;
    console.log(vehicleId);
    // Update the user's or dealer's vehicles list
    const collection = authenticatedUser
      ? usersCollection
      : dealershipCollection;
    const updateField = authenticatedUser ? "vehicle_info" : "sold_vehicles";

    await collection.updateOne(
      {
        _id: authenticatedUser
          ? authenticatedUser._id
          : authenticatedDealer._id,
      },
      { $push: { [updateField]: vehicleId } }
    );

    res.status(201).json({ vehicleId });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Endpoint to view all deals from a certain dealership
const dealershipDeals = async (req, res) => {
  try {
    const { dealershipId } = req.params;

    // Find the dealership
    const dealership = await dealershipCollection.findOne({
      _id: new ObjectId(dealershipId),
    });

    if (!dealership) {
      return res.status(404).json({ error: "Dealership not found" });
    }

    // Retrieve deals from the dealership
    const dealershipDeals = await dealsCollection
      .find({ _id: { $in: dealership.deals } })
      .toArray();

    res.json({ deals: dealershipDeals });
  } catch (error) {
    console.error("Error fetching deals from dealership:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { commonCars, dealerCars, dealershipDeals, addVehicles };
