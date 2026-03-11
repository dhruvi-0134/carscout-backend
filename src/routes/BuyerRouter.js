const router = require("express").Router()
const buyerController = require("../controllers/BuyerController")
router.post("/register", buyerController.registerBuyer)
module.exports = router