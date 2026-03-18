const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT

app.use(cors())
app.use(express.json())   // ✅ REQUIRED to read JSON body
app.use("/uploads", express.static("uploads"))
const DBConnection = require("./src/utils/DBConnection")
DBConnection()

const adminRouter = require("./src/routes/AdminRoute")
app.use("/admin", adminRouter)

const buyerRouter = require("./src/routes/BuyerRouter")
app.use("/buyer", buyerRouter)

const sellerRouter = require("./src/routes/SellerRouter")
app.use("/seller", sellerRouter)

const carRouter = require("./src/routes/CarRouter")
app.use("/car", carRouter)

const carListingRouter = require("./src/routes/CarListingRoutes")
app.use("/carListing", carListingRouter)

const inspectionRouter = require("./src/routes/InspectionRoute")
app.use("/inspection", inspectionRouter)

const MediaGalleryRouter = require("./src/routes/MediaGalleryRouter")
app.use("/mediagallery", MediaGalleryRouter)

const notificationRouter = require("./src/routes/NotificationRouter")
app.use("/notification", notificationRouter)

const OfferNegotiationRouter = require("./src/routes/OfferNegotiationRouter")
app.use("/offer", OfferNegotiationRouter)

const paymentRouter = require("./src/routes/PaymentRouter")
app.use("/payment", paymentRouter)

const reviewRouter = require("./src/routes/ReviewRouter")
app.use("/review", reviewRouter)

const testDriveRouter = require("./src/routes/TestDriveRouter")
app.use("/testdrive", testDriveRouter)

const transactionRouter = require("./src/routes/TransactionRouter")
app.use("/transaction", transactionRouter)

const userRouter = require("./src/routes/UserRouter")
app.use("/user", userRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
