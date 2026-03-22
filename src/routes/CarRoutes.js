const express = require("express")
const router = express.Router()
const carController = require("../controllers/CarController")

const testMiddleware = require("../middleware/TestMiddleware")
// ❌ removed: const validateToken = require("../middleware/AuthMiddleware")

router.post("/add", carController.addCar)

// ❌ removed validateToken from here
router.get("/get", carController.getAllCars)

router.get("/get/:id", carController.getCarById)
router.put("/update/:id", carController.updateCar)
router.delete("/delete/:id", carController.deleteCar)

module.exports = router