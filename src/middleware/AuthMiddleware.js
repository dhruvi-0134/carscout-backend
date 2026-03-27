const jwt = require("jsonwebtoken")
const secret = "secret"

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        console.log("TOKEN:", token)

        if (token) {
            if (token.startsWith("Bearer ")) {

                const tokenValue = token.split(" ")[1]

                // ✅ ONLY VERIFY TOKEN
                const decodedData = jwt.verify(tokenValue, secret)

                // ✅ attach user data
                req.user = decodedData

                console.log("DECODED:", decodedData)

                next()

            } else {
                return res.status(401).json({
                    message: "Token is not Bearer format"
                })
            }
        } else {
            return res.status(401).json({
                message: "Token not provided"
            })
        }

    } catch (err) {
        console.log("TOKEN ERROR:", err.message)

        return res.status(401).json({
            message: "Invalid or expired token",
            error: err.message
        })
    }
}

module.exports = validateToken