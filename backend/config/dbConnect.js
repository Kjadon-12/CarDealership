const { MongoClient } = require("mongodb");

let url = process.env.MONGODB_URL;
console.log(url);
const client = new MongoClient(
  "mongodb+srv://kanchanjadon96:k@cluster0.zrj66p3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = { client, connectToMongoDB };
