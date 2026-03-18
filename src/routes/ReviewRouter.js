const router = require("express").Router()
const reviewController = require("../controllers/ReviewController")

router.post("/add", reviewController.addReview)
router.get("/all", reviewController.getAllReviews)
router.get("/:id", reviewController.getReviewById)
router.put("/:id", reviewController.updateReview)
router.delete("/:id", reviewController.deleteReview)

module.exports = router