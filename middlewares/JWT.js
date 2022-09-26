const dotenv = require('dotenv');
dotenv.config();
const jwt = require("jsonwebtoken");
module.exports = { 
    verifyToken (req, res, next) {
        const token = req.headers.authorization.split("Bearer ")[1];
        if (!token) {
          return res.status(403).send({
            message: "No token provided!"
          });
        }
      
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
          if (err) {
            return res.status(401).send({
              message: "Unauthorized!"
            });
          }
          req.userId = decoded.id;
          next();
        });
    },
};