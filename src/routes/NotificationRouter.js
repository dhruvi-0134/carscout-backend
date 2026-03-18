const router = require("express").Router()
const notificationController = require("../controllers/NotificationController")

router.post("/add", notificationController.addNotification)
router.get("/all", notificationController.getAllNotifications)
router.get("/:id", notificationController.getNotificationById)
router.put("/:id", notificationController.updateNotification)
router.delete("/:id", notificationController.deleteNotification)

module.exports = router