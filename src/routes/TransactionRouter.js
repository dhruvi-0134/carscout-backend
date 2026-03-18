const router = require("express").Router()
const transactionController = require("../controllers/TransactionController")

router.post("/add", transactionController.addTransaction)
router.get("/all", transactionController.getAllTransactions)
router.get("/:id", transactionController.getTransactionById)
router.put("/:id", transactionController.updateTransaction)
router.delete("/:id", transactionController.deleteTransaction)

module.exports = router