const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailsend = require("../utils/MailUtil");
const jwt = require("jsonwebtoken")
const secret = "secret"
const registerUser = async (req, res) => {
    try {

        const { firstName, lastName, email, password, role } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // ✅ FIX 1: correct model name
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        // ✅ FIX 2: correct model name
        const savedUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedpassword,
            role
        });

        console.log("Sending email to:", savedUser.email);

        try {
            await mailsend(
                savedUser.email,
                "Welcome to CarScout 🚗",
                `Hi ${savedUser.firstName},

Thank you for registering with our app.

We are happy to have you on CarScout.

CarScout Team`
            );

            console.log("Email sent successfully");

        } catch (mailError) {
            console.log("Email sending failed:", mailError.message);
        }

        res.status(201).json({
            message: "user registered successfully",
            data: savedUser
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔍 Find user by email
        const foundUserFromEmail = await userSchema.findOne({ email: email });

        if (foundUserFromEmail) {

            // 🔐 Compare password
            const isPasswordMatched = await bcrypt.compare(
                password,
                foundUserFromEmail.password
            );

            if (isPasswordMatched) {

                // ✅ GENERATE TOKEN (FIXED)
                const token = jwt.sign(
                    {
                        id: foundUserFromEmail._id,
                        email: foundUserFromEmail.email,
                        role: foundUserFromEmail.role
                    },
                    secret,
                    { expiresIn: "1d" }   // ✅ fixed (not 60 seconds)
                );

                res.status(200).json({
                    message: "Login Success",
                    token: token,
                    role: foundUserFromEmail.role
                });

            } else {
                res.status(401).json({
                    message: "Invalid Credentials (Password wrong)"
                });
            }

        } else {
            res.status(404).json({
                message: "User not found"
            });
        }

    } catch (err) {
        res.status(500).json({
            message: "Error while logging in",
            error: err.message
        });
    }
};
module.exports = {
    registerUser,
    loginUser
};