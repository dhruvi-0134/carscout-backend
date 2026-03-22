const Car = require("../models/CarModel")
const Media = require("../models/MediaGalleryModel")


// Add Car
const addCar = async (req, res) => {
    try {
        {/*const existingCar = await Car.findOne({
    sellerId:req.body.sellerId,
    brand:req.body.brand,
    model:req.body.model,
    year:req.body.year
})

  if(existingCar){
   return res.status(400).json({
     message:"Car already exists"
 })
}*/}



        const newCar = await Car.create(req.body)

        res.status(201).json({
            message: "Car added successfully",
            data: newCar
        })

    } catch (err) {
        res.status(500).json({
            message: "Error while adding car",
            err
        })
    }
}


// Get All Cars
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find().populate({
            path: "sellerId",
            populate: {
                path: "userId"
            }
        })

        const carsWithMedia = await Promise.all(
            cars.map(async (car) => {

                const media = await Media.find({
                    carId: car._id
                }).select("mediaUrl mediaType");

                return {
                    ...car.toObject(),
                    media: media
                };
            })
        );

        res.status(200).json({
            message: "Cars fetched successfully",
            data: carsWithMedia
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Error fetching cars",
            err: err.message
        });
    }
};
// Get Car By ID
const getCarById = async (req, res) => {
    try {

        const carId = req.params.id
        //get car

        const car = await Car.findById(carId)
            .populate("sellerId")   // ✅ FIRST LEVEL
            .populate("sellerId.userId"); // ✅ SECOND LEVEL
        if (!car) {
            return res.status(404).json({
                message: "Car not found"
            })
        }
        // Get media for this car
        const media = await Media.find({
            carId: car._id
        })

        // Combine car + media
        const carWithMedia = {
            ...car.toObject(),
            media: media
        }


        res.status(200).json({
            message: "Car fetched successfully",
            data: carWithMedia
        })

    } catch (err) {
        res.status(500).json({
            message: "Error fetching car",
            err
        })
    }
}


// Update Car
const updateCar = async (req, res) => {
    try {

        const carId = req.params.id

        const updatedCar = await Car.findByIdAndUpdate(
            carId,
            req.body,
            { new: true }
        )

        res.status(200).json({
            message: "Car updated successfully",
            data: updatedCar
        })

    } catch (err) {
        res.status(500).json({
            message: "Error updating car",
            err
        })
    }
}


// Delete Car
const deleteCar = async (req, res) => {
    try {

        const carId = req.params.id

        const deletedCar = await Car.findByIdAndDelete(carId)

        res.status(200).json({
            message: "Car deleted successfully",
            data: deletedCar
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
    getCarById,
    updateCar,
    deleteCar
}