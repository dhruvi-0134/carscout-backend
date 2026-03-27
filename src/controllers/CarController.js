const User = require("../models/UserModel");
const Car = require("../models/CarModel");
const Media = require("../models/MediaGalleryModel");
const Seller = require("../models/SellerModel");

// Add Car
const addCar = async (req, res) => {
    try {
        const userId = req.user.id;

        const seller = await Seller.findOne({ userId });
        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        const newCar = await Car.create({
            ...req.body,
            sellerId: seller._id
        });

        res.status(201).json({
            message: "Car added successfully",
            data: newCar
        });

    } catch (err) {
        res.status(500).json({ message: "Error while adding car", err: err.message });
    }
};

// Get All Cars
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find().populate({
            path: "sellerId",
            populate: { path: "userId" }
        });

        const carsWithMedia = await Promise.all(
            cars.map(async (car) => {
                const media = await Media.find({ carId: car._id })
                    .select("mediaUrl mediaType");
                return { ...car.toObject(), media };
            })
        );

        res.status(200).json({
            message: "Cars fetched successfully",
            data: carsWithMedia
        });

    } catch (err) {
        res.status(500).json({ message: "Error fetching cars", err: err.message });
    }
};

// Get Car By ID
const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
            .populate({
                path: "sellerId",
                populate: { path: "userId" }
            });

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        const media = await Media.find({ carId: car._id });

        res.status(200).json({
            message: "Car fetched successfully",
            data: { ...car.toObject(), media }
        });

    } catch (err) {
        res.status(500).json({ message: "Error fetching car", err: err.message });
    }
};

// ✅ ONLY ONE VERSION (FINAL)
const getCarsBySeller = async (req, res) => {
    try {
        const userId = req.params.userId;

        const seller = await Seller.findOne({ userId });
        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        const cars = await Car.find({ sellerId: seller._id })
            .populate({
                path: "sellerId",
                populate: { path: "userId" }
            });

        const carsWithMedia = await Promise.all(
            cars.map(async (car) => {
                const media = await Media.find({ carId: car._id })
                    .select("mediaUrl mediaType");
                return { ...car.toObject(), media };
            })
        );

        res.status(200).json({
            message: "Cars fetched successfully",
            data: carsWithMedia
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching seller cars",
            err: err.message
        });
    }
};

// Update Car
const updateCar = async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Car updated successfully",
            data: updatedCar
        });

    } catch (err) {
        res.status(500).json({ message: "Error updating car", err: err.message });
    }
};

// Delete Car
const deleteCar = async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Car deleted successfully",
            data: deletedCar
        });

    } catch (err) {
        res.status(500).json({ message: "Error deleting car", err: err.message });
    }
};

// ✅ EXPORT (ONLY ONCE)
module.exports = {
    addCar,
    getAllCars,
    getCarById,
    getCarsBySeller,
    updateCar,
    deleteCar
};