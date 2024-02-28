const { client } = require("./dbConnect");

// Define  collections
const usersCollection = client.db().collection("users");
const dealershipCollection = client.db().collection("dealerships");
const adminCollection = client.db().collection("admins");
const soldVehicleCollection = client.db().collection("soldVehicles");
const carsCollection = client.db().collection("cars");
const dealsCollection = client.db().collection("deals");

// Export the collections
module.exports = {
  usersCollection,
  dealershipCollection,
  adminCollection,
  soldVehicleCollection,
  carsCollection,
  dealsCollection,
};
