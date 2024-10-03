const express = require("express")
const bodyParser = require("body-parser")
const userRouter = require("./controller/user")

const app = express()
const PORT = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/user", userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})