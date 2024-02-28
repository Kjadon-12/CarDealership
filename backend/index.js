const express = require('express');
const app = express();
const dotenv = require('dotenv');
const {connectToMongoDB} = require('./config/dbConnect');
const userRoute = require('./routes/user/user');
const dealerRoute = require('./routes/dealer/dealer');
const authDealer = require('./middleware/authDealer')
const authUser = require('./middleware/authUser');
const commonRoute = require('./routes/userDealer/userD')
const authRoute = require('./routes/authentication/authentication')
const cors = require('cors');
const authenticateUserOrDealer = require('./middleware/authUD');

dotenv.config();
connectToMongoDB();
app.use(express.json())
app.use(cors());
app.use('/auth' , authRoute)

app.use('/user' , userRoute) 
app.use('/dealership' , dealerRoute)

// Middleware to authenticate both user and dealer
app.use('/common', authenticateUserOrDealer , commonRoute);

app.listen(process.env.PORT , ()=>{
    console.log("Server is running on port " + process.env.PORT)
})