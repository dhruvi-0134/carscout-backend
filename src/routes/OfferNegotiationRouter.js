const router = require("express").Router()
const offerController = require("../controllers/OfferNegotiationController")

router.post("/add", offerController.addOffer)
router.get("/all", offerController.getAllOffers)
router.get("/:id", offerController.getOfferById)
router.put("/:id", offerController.updateOffer)
router.delete("/:id", offerController.deleteOffer)

module.exports = router