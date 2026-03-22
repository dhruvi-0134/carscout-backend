const userSchema = require("../models/UserModel")
const Seller = require("../models/SellerModel")
const bcrypt = require("bcrypt")
const mailSend = require("../utils/MailUtil")
const jwt = require("jsonwebtoken")
const secret = "secret"

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role, sellerType, companyName } = req.body

    // ✅ validation (added)
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    const existingUser = await userSchema.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const savedUser = await userSchema.create({
      fullName,
      email,
      password: hashedPassword,
      role: role || "buyer"
    })

    // ✅ seller creation (no change, just safe)
    if (savedUser.role === "seller") {
      const existingSeller = await Seller.findOne({
        userId: savedUser._id
      })

      if (!existingSeller) {
        await Seller.create({
          userId: savedUser._id,
          companyName: companyName || "",
          sellerType: sellerType || "dealer",
          verificationStatus: false
        })
      }
    }

    const htmlMessage = `Welcome ${fullName}, your account created successfully`

    // ✅ FIX: mailSend wrapped in try-catch (IMPORTANT)
    try {
      await mailSend(
        savedUser.email,
        "Welcome to Car Scout",
        htmlMessage
      )
    } catch (mailErr) {
      console.log("Mail Error:", mailErr.message)
    }

    res.status(201).json({
      message: "user created successfully",
      data: savedUser
    })

  } catch (err) {
    console.log("REGISTER ERROR:", err.message) // ✅ debug added

    res.status(500).json({
      message: "error while creating user",
      error: err.message
    })
  }
}

const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      })
    }

    const foundUserFromEmail = await userSchema.findOne({ email: email })

    if (!foundUserFromEmail) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    if (foundUserFromEmail.status !== "active") {
      return res.status(403).json({
        message: "Account is not active"
      })
    }

    const isPasswordMatched = await bcrypt.compare(password, foundUserFromEmail.password)

    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    const token = jwt.sign(foundUserFromEmail.toObject(), secret)

    res.status(200).json({
      message: "Login success",
      token: token,
      role: foundUserFromEmail.role,
      data: foundUserFromEmail
    })

  } catch (err) {
    console.log("LOGIN ERROR:", err.message)

    res.status(500).json({
      message: "Error while logging in",
      error: err.message
    })
  }
}

module.exports = {
  registerUser,
  loginUser
}