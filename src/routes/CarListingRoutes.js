const router = require("express").Router()
const carListingController = require("../controllers/CarListingcontrollers")
router.post("/add", carListingController.addCarListing)
router.get("/all", carListingController.getAllCarListings)
router.get("/:id", carListingController.getCarListingById)
router.put("/:id", carListingController.updateCarListing)
router.delete("/:id", carListingController.deleteCarListing)
module.exports = router