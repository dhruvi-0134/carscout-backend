const router = require("express").Router();

const validateToken = require("../middleware/AuthMiddleware");
const userController = require("../controllers/UserController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/forgotpassword", userController.forgotPassword)
router.put("/resetpassword", userController.resetPassword)
router.get("/profile", validateToken, userController.getProfile);
router.put("/profile", validateToken, userController.updateProfile);
module.exports = router;