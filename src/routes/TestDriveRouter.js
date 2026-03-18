const router = require("express").Router()
const testDriveController = require("../controllers/TestDriveController")

router.post("/add", testDriveController.addTestDrive)
router.get("/all", testDriveController.getAllTestDrives)
router.get("/:id", testDriveController.getTestDriveById)
router.put("/:id", testDriveController.updateTestDrive)
router.delete("/:id", testDriveController.deleteTestDrive)

module.exports = router