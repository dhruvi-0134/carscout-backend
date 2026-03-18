const Car = require("../models/CarModel")
const { uploadToCloudinary } = require("../utils/CloudinaryUtil")
const addCar = async (req, res) => {
    try {
        console.log("BODY 👉", req.body);
        console.log("FILE 👉", req.file);

        if (!req.file) {
            return res.status(400).json({
                message: "Image file not received"
            });
        }

        const cloudinaryResponse = await uploadToCloudinary(req.file.path);

        console.log("CLOUDINARY 👉", cloudinaryResponse);

        const savedCar = await Car.create({
            ...req.body,
            image: cloudinaryResponse.secure_url,
            public_id: cloudinaryResponse.public_id
        });

        res.status(201).json({
            message: "Car added successfully",
            data: savedCar
        });

    } catch (err) {
        console.log("FINAL ERROR 👉", err);

        res.status(500).json({
            message: "Error while creating car",
            error: err.message
        });
    }
};


const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find()
            .populate("seller_id")
        res.status(200).json({
            message: "Cars fetched successfully",
            data: cars
        })
    } catch (err) {
        res.status(500).json({
            message: "Error fetching cars",
            err
        })
    }
}
const getcarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
            .populate("seller_id")
        res.status(200).json({
            message: "Car fetched successfully",
            data: car
        })
    } catch (err) {
        res.status(500).json({
            message: "Error fetching car",
            err
        })
    }
}
const UpdateCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json({
            message: "Car updated successfully",
            data: car
        })
    } catch (err) {
        res.status(500).json({
            message: "Error updating car",
            err
        })
    }
}
const deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Car deleted successfully",
            data: car
        })
    } catch (err) {
        res.status(500).json({
            message: "Error deleting car",
            err
        })
    }
}

module.exports = {
    addCar,
    getAllCars,
    getcarById,
    UpdateCar,
    deleteCar
}