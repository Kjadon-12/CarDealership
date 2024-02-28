const jwt = require("jsonwebtoken");
const { dealershipCollection } = require('../config/collection');
const { ObjectId } = require("mongodb");

const authDealer = async (req, res, next) => {
    let token;

    if (req?.headers?.authorization?.startsWith('Bearer ')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (token) {
                const decoded = await jwt.verify(token, process.env.JWT_KEY);
                // console.log("decoded")
                // console.log(decoded);
                req.dealer = decoded?.id;
                next();
                
                // Find the dealer by _id
                // const dealer = await dealershipCollection.findOne(  { _id: new ObjectId(decoded.id)}).select("-password")
                // console.log(dealer);
                
                //     req.dealer = dealer;
                //     next();
                
            }
        } catch (error) {
            throw new Error("Not authorized, token expired or invalid");
        }
    } else {
        throw new Error("There is no token attached to the header");
    }
};

module.exports = authDealer;
