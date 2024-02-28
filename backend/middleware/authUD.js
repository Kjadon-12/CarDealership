const jwt = require("jsonwebtoken");
const { usersCollection, dealershipCollection } = require('../config/collection');
const { ObjectId } = require("mongodb");

const authenticateUserOrDealer = async (req, res, next) => {
  try {
    let token;

    if (req?.headers?.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];

      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Check if the decoded ID exists in either user or dealer collections
        const user = await usersCollection.findOne({ _id:new ObjectId(decoded.id) });
        const dealer = await dealershipCollection.findOne({ _id: new ObjectId(decoded.id)  });

        if (user) {
          // If user exists, attach user to the result object
          req.authenticatedUser = user;
        } else if (dealer) {
          // If dealer exists, attach dealer to the result object
          req.authenticatedDealer = dealer;
        } else {
          throw new Error('User or dealer not found');
        }

        next();
      }
    } else {
      throw new Error('There is no token attached to the header');
    }
  } catch (error) {
    res.status(401).json({ error: 'Not authorized, token expired or invalid' });
  }
};

module.exports = authenticateUserOrDealer;
