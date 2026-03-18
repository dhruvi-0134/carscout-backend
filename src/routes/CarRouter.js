const router = require("express").Router()
const carController = require("../controllers/CarController")
const upload = require("../middleware/UploadMiddleware")
router.post("/add", upload.single("image"), carController.addCar);
router.get("/all", carController.getAllCars)
router.get("/:id", carController.getcarById)
router.put("/:id", carController.UpdateCar)
router.delete("/:id", carController.deleteCar)
module.exports = router