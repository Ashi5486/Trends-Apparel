const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token = req.cookies.token || (req.headers.authorization?.startsWith("Bearer") && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

module.exports = { protect };



// // authMiddleware.js
// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) {
//     return res.status(401).json({ message: "Authorization denied, no token found." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user; // Assuming the JWT contains user info
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Token is not valid." });
//   }
// };

// module.exports = protect;

