const express = require("express");
const http = require("http"); // ✅ Needed for Socket.IO
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config(); // ✅ FIRST

const app = express();

// ✅ CORS (ONLY ONCE)
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true
}));

// ✅ BODY PARSER (ONLY ONCE)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ STATIC FILES
app.use("/uploads", express.static("uploads"));

// ✅ DB
const DBConnection = require("./src/utils/DBConnection");
DBConnection();

// ✅ ROUTES
const userRoutes = require("./src/routes/UserRoutes");
app.use("/user", userRoutes);

const carRoutes = require("./src/routes/CarRoutes");
app.use("/cars", carRoutes);

const listingRoutes = require("./src/routes/CarListingRoutes");
app.use("/listings", listingRoutes);

const testDriveRoutes = require("./src/routes/TestDriveRoutes");
app.use("/testdrives", testDriveRoutes);

const transactionRoutes = require("./src/routes/TransactionRoutes");
app.use("/transactions", transactionRoutes);

const paymentRoutes = require("./src/routes/PaymentRoutes");
app.use("/payments", paymentRoutes);

const adminRoutes = require("./src/routes/AdminRoutes");
app.use("/admin", adminRoutes);

const reportRoutes = require("./src/routes/InspectionReportRoutes");
app.use("/reports", reportRoutes);

const mediaRoutes = require("./src/routes/MediaGalleryRoutes");
app.use("/media", mediaRoutes);

const offerRoutes = require("./src/routes/OfferRoutes");
app.use("/offers", offerRoutes);

const feedbackRoutes = require("./src/routes/FeedbackRoutes");
app.use("/feedback", feedbackRoutes);

const notificationRoutes = require("./src/routes/NotificationRoutes");
app.use("/notifications", notificationRoutes);

// ✅ SERVER SETUP
const PORT = process.env.PORT || 5000;

// Use HTTP server for Socket.IO
const server = http.createServer(app);

// ✅ SOCKET.IO SETUP
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// Make io accessible in controllers
app.set("io", io);

// ✅ Listen for client connections
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// ✅ START SERVER
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT} with real-time support`);
});