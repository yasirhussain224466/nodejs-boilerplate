const express = require("express");
const userController = require("./../controllers/user/userController");
const authController = require("./../controllers/user/authController");

const router = express.Router();

//authentication routes
router.post("/checkEmail", authController.checkEmail);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.get("/isLoggedIn", authController.isLoggedIn);

// user routes
router.use(authController.protect);

router
  .use(authController.protect)
  .route("/")
  .get(userController.getAllUsers);

router
  .use(authController.protect)
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
