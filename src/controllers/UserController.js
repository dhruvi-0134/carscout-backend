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
    const { email, password } = req.body;

    console.log("LOGIN INPUT:", email, password);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }


    const foundUserFromEmail = await userSchema.findOne({ email });

    console.log("FOUND USER:", foundUserFromEmail);

    if (!foundUserFromEmail) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    console.log("DB PASSWORD:", foundUserFromEmail.password);

    const isPasswordMatched = await bcrypt.compare(
      password,
      foundUserFromEmail.password
    );

    console.log("PASSWORD MATCH:", isPasswordMatched);

    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    if (foundUserFromEmail.accountStatus === "blocked") {
      return res.status(403).json({
        message: "Your account is blocked by admin"
      });
    }

    let seller = null;
    if (foundUserFromEmail.role === "seller") {
      seller = await Seller.findOne({
        userId: foundUserFromEmail._id
      });
    }

    const token = jwt.sign({
      id: foundUserFromEmail._id,
      role: foundUserFromEmail.role,
      sellerId: seller ? seller._id : null
    }, secret);

    res.status(200).json({
      message: "Login success",
      token,
      role: foundUserFromEmail.role,
      user: {
        _id: foundUserFromEmail._id,
        fullName: foundUserFromEmail.fullName,
        email: foundUserFromEmail.email,
        role: foundUserFromEmail.role,
        profilepicture: foundUserFromEmail.profilepicture || ""
      }
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err.message);

    res.status(500).json({
      message: "Error while logging in",
      error: err.message
    });
  }
};
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userSchema.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    let seller = null;

    // ✅ if seller → fetch seller data
    if (user.role === "seller") {
      seller = await Seller.findOne({ userId: user._id });
    }

    res.status(200).json({
      message: "Profile fetched",
      data: {
        user,
        seller   // 🔥 IMPORTANT
      }
    });

  } catch (err) {
    console.log("PROFILE ERROR:", err.message);

    res.status(500).json({
      message: "Error fetching profile",
      error: err.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { fullName, companyName, sellerType } = req.body;

    // ✅ update user
    const updatedUser = await userSchema.findByIdAndUpdate(
      userId,
      { fullName },
      { new: true }
    );

    let updatedSeller = null;

    // ✅ if seller → update seller data
    if (companyName || sellerType) {
      updatedSeller = await Seller.findOneAndUpdate(
        { userId },
        { companyName, sellerType },
        { new: true }
      );
    }

    res.status(200).json({
      message: "Profile updated",
      data: {
        user: updatedUser,
        seller: updatedSeller
      }
    });

  } catch (err) {
    console.log("UPDATE ERROR:", err.message);

    res.status(500).json({
      message: "Error updating profile"
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    // ✅ FIXED MODEL NAME
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      secret,
      { expiresIn: "15m" }
    );

    const resetLink = `http://localhost:5173/resetpassword/${token}`;

    const mailHtml = `
      <h2>Password Reset</h2>
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
    `;

    // ✅ SAFE MAIL
    try {
      await mailSend(user.email, "Reset Password", mailHtml);
    } catch (mailErr) {
      console.log("MAIL ERROR:", mailErr.message);
    }

    res.status(200).json({
      message: "Reset link sent to email"
    });

  } catch (err) {
    console.log("FORGOT ERROR:", err.message);

    res.status(500).json({
      message: "Error sending reset email",
      error: err.message
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { newPassword, token } = req.body;

    // ❌ validation missing before
    if (!newPassword || !token) {
      return res.status(400).json({
        message: "New password and token required"
      });
    }

    // ✅ verify token
    const decoded = jwt.verify(token, secret);

    // ✅ IMPORTANT CHANGE → use decoded.id
    const userId = decoded.id;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userSchema.findByIdAndUpdate(userId, {
      password: hashedPassword
    });

    res.status(200).json({
      message: "Password reset successfully"
    });

  } catch (err) {
    console.log("RESET ERROR:", err.message);

    res.status(400).json({   // 🔥 change 500 → 400 for token errors
      message: "Invalid or expired token"
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,


}