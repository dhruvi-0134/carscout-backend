const router = require("express").Router()
const buyerController = require("../controllers/BuyerController")
router.post("/add", buyerController.addBuyer)
router.get("/all", buyerController.getAllbuyers)
router.get("/:id", buyerController.getBuyerById)
router.put("/:id", buyerController.updateBuyer)
router.delete("/:id", buyerController.deleteBuyer)
module.exports = router