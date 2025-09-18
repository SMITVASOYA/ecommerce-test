const route =  require("express").Router()
const productRoute =  require("./products")
const orderRoute =  require("./orders")
const userRoute =  require("./users")

route.use("/auth", userRoute)
route.use("/orders", orderRoute)
route.use("/products", productRoute)

module.exports =  route