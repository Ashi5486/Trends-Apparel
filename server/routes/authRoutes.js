// const express = require("express");
// const { signupUser, loginUser, logoutUser } = require("../controllers/userController");
// const router = express.Router();

// router.post("/signup", signupUser);
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);

// // Protect this route to check if the user is authenticated
// router.get("/protectedPage", (req, res) => {
//     res.status(200).json({ message: "You are authenticated" });
// });

// module.exports = router;


const express = require("express");
const { signupUser, loginUser, logoutUser } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/protectedPage", (req, res) => {
  // Simulate a check (add real auth middleware here)
  const isAuthenticated = true; // Replace with session/cookie check
  if (isAuthenticated) {
    res.status(200).json({ message: "You are authenticated" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
