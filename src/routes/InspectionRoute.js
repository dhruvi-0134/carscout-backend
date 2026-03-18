const router = require("express").Router()
const inspectionController = require("../controllers/InspectionController")
router.post("/add", inspectionController.addInspection)
router.get("/all", inspectionController.getAllInspections)
router.get("/:id", inspectionController.getInspectionById)
router.put("/:id", inspectionController.updateInspection)
router.delete("/:id", inspectionController.deleteInspection)
module.exports = router