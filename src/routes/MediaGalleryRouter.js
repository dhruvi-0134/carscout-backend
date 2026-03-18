const router = require("express").Router()
const mediaController = require("../controllers/MediaGalleryController")

router.post("/add", mediaController.addMedia)
router.get("/all", mediaController.getAllMedia)
router.get("/:id", mediaController.getMediaById)
router.put("/:id", mediaController.updateMedia)
router.delete("/:id", mediaController.deleteMedia)

module.exports = router