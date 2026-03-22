const TestDrive = require("../models/TestDriveModel");
const sendMail = require("../utils/MailUtil");

const User = require("../models/UserModel");
const Seller = require("../models/SellerModel");
const Car = require("../models/CarModel");

// ✅ CREATE (WITH EMAIL)
const createTestDrive = async (req, res) => {
    try {

        const { buyerId, sellerId, carId, testDriveDate } = req.body;

        const existingTestDrive = await TestDrive.findOne({
            buyerId,
            carId,
            testDriveDate
        });

        if (existingTestDrive) {
            return res.status(400).json({
                message: "Test drive already requested"
            });
        }

        const newTestDrive = await TestDrive.create(req.body);

        // 🔥 FETCH DETAILS
        const buyer = await User.findById(buyerId);
        const seller = await Seller.findById(sellerId);
        const car = await Car.findById(carId);

        // 📧 EMAIL TEMPLATE
        const html = `
            <div style="font-family: Arial; padding: 20px;">
                <h2>🚗 Test Drive Confirmed</h2>
                <p>Hello ${buyer?.name || "User"},</p>

                <p>Your test drive is successfully booked.</p>

                <hr/>

                <p><b>Car:</b> ${car?.brand} ${car?.model}</p>
                <p><b>Seller:</b> ${seller?.name}</p>
                <p><b>Date:</b> ${new Date(testDriveDate).toLocaleDateString()}</p>
                <p><b>Time:</b> ${new Date(testDriveDate).toLocaleTimeString()}</p>

                <hr/>
                <p>Thank you for using CarScout 🚀</p>
            </div>
        `;

        // ✅ SAFE EMAIL (won’t crash server)
        try {
            await sendMail(
                buyer.email,
                "Test Drive Confirmation 🚗",
                html
            );
        } catch (mailErr) {
            console.log("Email failed:", mailErr);
        }

        res.status(201).json({
            message: "Test drive scheduled successfully",
            data: newTestDrive
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error scheduling test drive",
            err
        });
    }
};


// ✅ GET ALL
const getAllTestDrives = async (req, res) => {
    try {
        const testDrives = await TestDrive.find()
            .populate("buyerId")
            .populate("sellerId")
            .populate("carId");

        res.status(200).json({
            message: "Test drives fetched successfully",
            data: testDrives
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching test drives",
            err
        });
    }
};


// ✅ GET BY ID
const getTestDriveById = async (req, res) => {
    try {

        const testDrive = await TestDrive.findById(req.params.id)
            .populate("buyerId")
            .populate("sellerId")
            .populate("carId");

        if (!testDrive) {
            return res.status(404).json({
                message: "Test drive not found"
            });
        }

        res.status(200).json({
            message: "Test drive fetched successfully",
            data: testDrive
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching test drive",
            err
        });
    }
};


// ✅ UPDATE
const updateTestDrive = async (req, res) => {
    try {

        const updatedTestDrive = await TestDrive.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Test drive updated successfully",
            data: updatedTestDrive
        });

    } catch (err) {
        res.status(500).json({
            message: "Error updating test drive",
            err
        });
    }
};


// ✅ DELETE
const deleteTestDrive = async (req, res) => {
    try {

        const deletedTestDrive = await TestDrive.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Test drive deleted successfully",
            data: deletedTestDrive
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting test drive",
            err
        });
    }
};


// ✅ EXPORT ALL (VERY IMPORTANT)
module.exports = {
    createTestDrive,
    getAllTestDrives,
    getTestDriveById,
    updateTestDrive,
    deleteTestDrive
};