const router = require("express").Router()
const sellerController = require("../controllers/SellerController")

router.post("/add", sellerController.addSeller)
router.get("/all", sellerController.getAllsellers)
router.get("/:id", sellerController.getSellerById)
router.put("/:id", sellerController.updateSeller)
router.delete("/:id", sellerController.deleteSeller)

module.exports = router