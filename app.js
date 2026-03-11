const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

app.use(cors())
app.use(express.json())   // ✅ REQUIRED to read JSON body

const DBConnection = require("./src/utils/DBConnection")
DBConnection()

const buyerRouter = require("./src/routes/BuyerRouter")
app.use("/buyer", buyerRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})