const bcrypt = require("bcrypt");
const {usersCollection , dealershipCollection} = require('../config/collection')
const generateToken = require("../config/token");

const userRegisterCtrl = async (req, res) => {
  const {userInfo , location , userEmail  , password} = req?.body

  // Check if the email already exists
  const existingUser = await usersCollection.findOne({ email: userEmail });

  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  let userRegister = await usersCollection.insertOne({
    email: userEmail,
    location: location,
    password: hashedPassword,
    userInfo: {
        name: userInfo.name,
        age: userInfo.age,
        
      },

  });
  console.log(userRegister);
  res.send("user added");
};

const dealerRegisterCtrl = async (req, res) => {
    const {dealerInfo , location , dealerEmail  , password} = req?.body
  
    // Check if the email already exists
    const existingDealer = await dealershipCollection.findOne({ email: dealerEmail });
  
    if (existingDealer) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    let userRegister = await dealershipCollection.insertOne({
      email: dealerEmail,
      location: location,
      password: hashedPassword,
      dealerInfo: {
          name: dealerInfo.name,
          age: dealerInfo.age,
          
        },
  
    });
    console.log(userRegister);
    res.send("dealer added");
  };

const userLoginCtrl = async (req, res) => {
  // Find the user by username
 const { userEmail , password} = req?.body

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    console.log("User not found");
    res.send("User not found");
    return;
  }

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user?.password);

  if (!passwordMatch) {
    console.log("Incorrect password");
    res.send("Password is incorrect")
    return;
  }

  // If passwords match, generate a JWT
  const token = generateToken(user?._id);
  console.log("Login successful");
  console.log("JWT:", token);
  // Save the token in the user document in the database
  await usersCollection.updateOne({ _id: user._id }, { $set: { token } });
  // Include the token in the response JSON
  const responseUser = { ...user, token };
  res.json(responseUser);
};

const dealerLoginCtrl = async (req, res) => {
    // Find the user by username
   const { dealerEmail , password} = req?.body
  
    const dealer = await dealershipCollection.findOne({ email: dealerEmail });
  
    if (!dealer) {
      console.log("Dealer not found");
      res.send("Dealer not found");
      return;
    }
  
    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, dealer?.password);
  
    if (!passwordMatch) {
      console.log("Incorrect password");
      res.send("Incorrect password");
      return;
    }
  
    // If passwords match, generate a JWT
    const token = generateToken(dealer?._id);
    console.log("Login successful");
    console.log("JWT:", token);
    // Save the token in the user document in the database
    await dealershipCollection.updateOne({ _id: dealer._id }, { $set: { token } });
    // Include the token in the response JSON
    const responseDealer = { ...dealer, token };
    res.json(responseDealer);
  };


module.exports = { userRegisterCtrl , userLoginCtrl , dealerRegisterCtrl , dealerLoginCtrl}