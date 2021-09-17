const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userAuthCheck = require("../middleware/checkAuth");
const upload = require("../middleware/multer");

/* -------------------------------------------------------------------------------- */
// Auth 
router.post("/login", userController.login);
router.post("/signup", userController.signup);

router.put("/profile-setup",
  upload.fields([
      { name: "profileImage", maxCount: 1 },
    ]),
  userAuthCheck,
  userController.profileSetup
);

router.get(
  "/get/profile",
  userAuthCheck,
  userController.getProfile
);

module.exports = router;
