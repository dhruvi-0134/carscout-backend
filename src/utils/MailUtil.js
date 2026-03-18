const mailer = require("nodemailer")
require("dotenv").config()

const mailsend = async (to, subject, name) => {

    const transporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const htmlTemplate = `
    <div style="font-family: Arial; background:#f4f4f4; padding:20px;">
      <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden;">

        <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8"
        style="width:100%; height:250px; object-fit:cover;" />

        <div style="padding:20px; text-align:center;">

          <h2 style="color:#2563eb;">Welcome to CarScout 🚗</h2>

          <p>Hello <b>${name}</b>,</p>

          <p>
          Thank you for joining <b>CarScout</b>.
          </p>

          <p>
          We help you discover the best cars easily.
          </p>

          <a href="http://127.0.0.1:3000"
          style="display:inline-block; margin-top:15px; padding:10px 20px;
          background:#2563eb; color:white; text-decoration:none; border-radius:5px;">
          Explore Cars
          </a>

          <p style="margin-top:20px; font-size:12px; color:#888;">
          © CarScout Team
          </p>

        </div>

      </div>
    </div>
    `

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: htmlTemplate
    }

    const mailResponse = await transporter.sendMail(mailOptions)

    console.log(mailResponse)

    return mailResponse
}

module.exports = mailsend