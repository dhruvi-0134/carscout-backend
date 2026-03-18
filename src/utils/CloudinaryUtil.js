const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// configure ONCE
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "cars"   // optional (creates folder in Cloudinary)
        });
        return result;
    } catch (error) {
        console.log("Cloudinary ERROR 👉", error);
        throw error;
    }
};

module.exports = { uploadToCloudinary };