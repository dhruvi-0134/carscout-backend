const express = require("express");
const router = express.Router();
const carController = require("../controllers/CarController");

const validateToken = require("../middleware/AuthMiddleware");

router.post("/add", validateToken, carController.addCar);

router.get("/get", carController.getAllCars);
router.get("/get/:id", carController.getCarById);
router.put("/update/:id", carController.updateCar);
router.delete("/delete/:id", carController.deleteCar);

// ✅ FIXED
router.get("/seller/:userId", carController.getCarsBySeller);

module.exports = router;