const router = require("express").Router()
const adminController = require("../controllers/AdminController")
router.post("/add", adminController.addAdmin)
router.get("/all", adminController.getAllAdmins)
router.get("/:id", adminController.getAdminById)
router.put("/:id", adminController.UpadateAdmin)
router.delete("/:id", adminController.deleteAdmin)
module.exports = router