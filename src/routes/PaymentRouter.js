const router = require("express").Router()
const paymentController = require("../controllers/PaymentController")

router.post("/add", paymentController.addPayment)
router.get("/all", paymentController.getAllPayments)
router.get("/:id", paymentController.getPaymentById)
router.put("/:id", paymentController.updatePayment)
router.delete("/:id", paymentController.deletePayment)

module.exports = router