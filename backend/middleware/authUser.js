

const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const {usersCollectionCollection} = require('../config/collection')


const authUser = async (req, res,next)=>{
    let token;

    if(req?.headers?.authorization?.startsWith('Bearer ')){
        try {
            token = req.headers.authorization.split(' ')[1];
            if(token){
              const decoded =  jwt.verify(token, process.env.JWT_KEY );
              console.log(decoded)
              //find the user id
            //   const user = await usersCollection.findOne({ _id:(decoded.id) });
              //attach the user to the result object
            //   console.log(user)
              req.user = new ObjectId(decoded.id);
              next();

            }
            
            
        } catch (error) {
            throw new Error("not authorized token expire , login again")
            
        }
        
    }
    else{
        throw new Error("there is no token attached to the header")
    }
}

module.exports = authUser;