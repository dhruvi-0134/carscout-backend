const express = require("express")
const router = express.Router()
const adminController = require("../controllers/AdminController")

router.get("/users", adminController.getAllUsers)
router.get("/sellers", adminController.getAllSellers)
router.put("/block/:id", adminController.blockUser)
router.put("/verify-seller/:id", adminController.verifySeller)
router.get("/listings", adminController.getAllListings)
router.put("unblock/:id", adminController.unblockUser)
module.exports = router