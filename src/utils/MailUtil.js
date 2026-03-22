const nodemailer = require("nodemailer");
require("dotenv").config();

// ✅ Create transporter ONCE (important)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// ✅ Verify connection (optional but best)
transporter.verify((err, success) => {
  if (err) {
    console.log("Email Error:", err);
  } else {
    console.log("Email server ready ✅");
  }
});

// ✅ Send Mail Function
const mailSend = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"Car Scout 🚗" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    };

    const response = await transporter.sendMail(mailOptions);

    console.log("Mail sent:", response.messageId);

    return response;

  } catch (error) {
    console.log("Mail error:", error);
    throw error;
  }
};

module.exports = mailSend;