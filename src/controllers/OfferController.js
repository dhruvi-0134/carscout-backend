const Offer = require("../models/OfferModel");
const Car = require("../models/CarModel");
const Media = require("../models/MediaGalleryModel");

// ✅ CREATE OFFER
const createOffer = async (req, res) => {
    try {
        const { buyerId, carId, sellerId, offeredPrice } = req.body;

        if (!buyerId || !carId || !sellerId || !offeredPrice) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // ✅ AUTO SET expiry (e.g. 7 days)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        let offer = await Offer.create({
            buyerId,
            carId,
            sellerId,
            offeredPrice,
            expiresAt // ✅ FIX
        });

        offer = await offer.populate("buyerId sellerId carId");

        const io = req.app.get("io");
        if (io) {
            io.emit(`offer_${buyerId}`, offer);
        }

        res.status(201).json({
            message: "Offer created successfully",
            data: offer
        });

    } catch (err) {
        console.error("CREATE OFFER ERROR:", err);
        res.status(500).json({
            message: err.message
        });
    }
};
// ✅ GET ALL OFFERS (🔥 FIXED PROPERLY)
const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find()
            .populate("buyerId")
            .populate("sellerId")
            .populate("carId");

        const offersWithMedia = await Promise.all(
            offers.map(async (offer) => {
                try {
                    // ✅ FULL SAFETY CHECK
                    if (!offer.carId || !offer.carId._id) {
                        return {
                            ...offer.toObject(),
                            carId: null
                        };
                    }

                    const media = await Media.find({ carId: offer.carId._id })
                        .select("mediaUrl"); // ✅ IMPORTANT

                    return {
                        ...offer.toObject(),
                        carId: {
                            ...offer.carId.toObject(),
                            media: media || []
                        }
                    };

                } catch (innerErr) {
                    console.error("Media fetch error:", innerErr);

                    return {
                        ...offer.toObject(),
                        carId: offer.carId || null
                    };
                }
            })
        );

        res.status(200).json({
            message: "Offers fetched",
            data: offersWithMedia
        });

    } catch (err) {
        console.error("Error fetching offers:", err);

        res.status(500).json({
            message: "Error fetching offers",
            error: err.message
        });
    }
};


// ✅ UPDATE OFFER
const updateOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        const io = req.app.get("io");
        if (io && req.body.offerStatus) {
            io.emit(`offer_${offer.buyerId}`, {
                _id: offer._id,
                offerStatus: offer.offerStatus
            });
        }

        res.status(200).json({
            message: "Offer updated",
            data: offer
        });

    } catch (err) {
        console.error("Error updating offer:", err);
        res.status(500).json({
            message: "Error updating offer",
            err: err.message
        });
    }
};


// ✅ DELETE OFFER
const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Offer deleted",
            data: offer
        });

    } catch (err) {
        console.error("Error deleting offer:", err);
        res.status(500).json({
            message: "Error deleting offer",
            err: err.message
        });
    }
};


// ✅ EXPORT
module.exports = {
    createOffer,
    getAllOffers,
    updateOffer,
    deleteOffer
};