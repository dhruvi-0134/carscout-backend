const BuyerModels = require("../models/BuyerModels")
const bcrypt = require("bcrypt")

const registerBuyer = async (req, res) => {

    try {

        const { firstName, lastName, email, password } = req.body

        if (!firstName) {
            return res.status(400).json({ message: "firstName field is required" })
        }

        if (!lastName) {
            return res.status(400).json({ message: "lastName field is required" })
        }

        if (!email) {
            return res.status(400).json({ message: "email field is required" })
        }

        if (!password) {
            return res.status(400).json({ message: "password field is required" })
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const savedBuyer = await BuyerModels.create({
            firstName,
            lastName,
            email,
            password: hashedpassword
        })

        res.status(201).json({
            message: "Buyer registered successfully",
            data: savedBuyer
        })

    } catch (err) {

        if (err.code === 11000) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    registerBuyer
}