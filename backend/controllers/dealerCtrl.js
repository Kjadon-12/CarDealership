const { ObjectId } = require('mongodb');
const {carsCollection, dealershipCollection, dealsCollection, soldVehicleCollection} = require('../config/collection')


const addCarsCtrl = async (req,res) => {


try {
    const dealerId = req.dealer;
    // console.log(dealerId)
    const { carInfo , type , name , model  } = req.body;

    // Insert the car
    const result = await carsCollection.insertOne({ type: type, name: name, model: model , carInfo:{
        color: carInfo.color
    }});
    const carId = result.insertedId;

    
    // Update the dealership's cars list
    await dealershipCollection.updateOne(
        { _id: new ObjectId(dealerId)  },
        {
          $addToSet: { cars: carId },
        },
        { upsert: true } // Creates the document if it doesn't exist
      );

    res.status(201).json({ carId });
  } catch (error) {
    console.error('Error adding car to dealership:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

const addDealCtrl = async (req, res) => {
// Endpoint to add deals to dealership

    try {
    //   const { dealer } = req;
    const dealerId = req.dealer;
    console.log(dealerId)
      const { dealInfo , carId} = req.body;

      // Insert the deal
      const result = await dealsCollection.insertOne({ carId: new ObjectId(carId) , dealInfo:{offer: dealInfo.offer} });
      const dealId = result.insertedId;

      // Update the dealership's deals list
      await dealershipCollection.updateOne(
        { _id: new ObjectId(dealerId)  },
        {
          $addToSet: { deals: dealId },
        },
        { upsert: true } // Creates the document if it doesn't exist
      );

      res.status(201).json({ dealId });
    } catch (error) {
      console.error('Error adding deal to dealership:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  

    

}

const dealerShipSold = async (req, res) => {
    try {
        // const { dealer } = req;
        const dealerId = req.dealer;

        // Get the list of sold vehicles
        // Get the list of sold vehicles
        const soldVehicles = await soldVehicleCollection.find({ dealer_id: new ObjectId(dealerId)  }).toArray();

        res.json({ soldVehicles });
        
      } catch (error) {
        console.error('Error fetching sold vehicles:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports = {addCarsCtrl , addDealCtrl , dealerShipSold}