const User = require("../models/UserModel")
const Seller = require("../models/SellerModel")
const Listing = require("../models/CarListingModel")


// ✅ CREATE ADMIN FROM USER
const createAdmin = async (req, res) => {
    try {
        const { userId, accessModules } = req.body;

        // check user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // make sure user is admin role
        if (user.role !== "admin") {
            return res.status(400).json({
                message: "User is not admin"
            });
        }

        // check already admin
        const existingAdmin = await Admin.findOne({ userId });

        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin already exists"
            });
        }

        // create admin
        const admin = await Admin.create({
            userId,
            accessModules
        });

        res.status(201).json({
            message: "Admin created successfully",
            data: admin
        });

    } catch (err) {
        res.status(500).json({
            message: "Error creating admin",
            error: err.message
        });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {

        const users = await User.find()

        res.status(200).json({
            message: "Users fetched successfully",
            data: users
        })

    } catch (err) {
        res.status(500).json({
            message: "Error fetching users",
            err
        })
    }
}

// Block user
const blockUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { accountStatus: "blocked" },
            { new: true }
        );

        res.json({
            message: "User blocked successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Verify seller
const verifySeller = async (req, res) => {
    try {

        const sellerId = req.params.id

        const seller = await Seller.findByIdAndUpdate(
            sellerId,
            { verificationStatus: true },
            { new: true }
        )

        res.status(200).json({
            message: "Seller verified",
            data: seller
        })

    } catch (err) {
        res.status(500).json({
            message: "Error verifying seller",
            err
        })
    }
}

// Get all listings
const getAllListings = async (req, res) => {
    try {

        const listings = await Listing.find().populate("carId")

        res.status(200).json({
            message: "Listings fetched",
            data: listings
        })

    } catch (err) {
        res.status(500).json({
            message: "Error fetching listings",
            err
        })
    }
}
const unblockUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { accountStatus: "active" },
            { new: true }
        );

        res.json({
            message: "User unblocked successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.find()
            .populate("userId", "fullName email"); // 🔥 IMPORTANT

        res.status(200).json({
            message: "Sellers fetched successfully",
            data: sellers
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching sellers",
            error: err.message
        });
    }
};
module.exports = {
    getAllUsers,
    blockUser,
    verifySeller,
    getAllListings,
    unblockUser,
    getAllSellers
}