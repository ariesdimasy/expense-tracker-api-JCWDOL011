const express = require("express")
const app = express()
const PORT = 8800

const expenseRouter = require("./routers/expenseRouter")

app.use(express.json())
app.use("/api/expenses", expenseRouter)

app.get("/",(req, res) => {
    res.status(200).send({
        message:"expense tracker api",
        data:{}
    })
})

app.listen(PORT, () => {
    console.log("server running on PORT = ", PORT)
})

