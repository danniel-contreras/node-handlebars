const express = require("express")
const cors = require("cors")
const { generate_test_pdf } = require("./pdf-generator")
const app = express()


app.use(cors({ origin: "*" }))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/test", async (req, res) => {
    const { title, total } = req.body
    const result = await generate_test_pdf(title,total)
    res.send(result)
})

app.listen(3004, () => {
    console.log("app is running at: http://10.0.5.3:3004")
})