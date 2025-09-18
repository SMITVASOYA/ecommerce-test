const express =  require("express")
require("dotenv").config()
require("./connection/connection")

const app =  express()
const PORT =  process.env.PORT || 3000
const route =  require("./route")

app.use(express.json())

app.use("/", route)

app.listen(PORT, ()=>console.log(`Server started on port: ${PORT}`))