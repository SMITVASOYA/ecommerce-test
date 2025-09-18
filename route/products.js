const route = require("express").Router();
const productController = require("../controller/productController");
const { authMiddleware } = require("../middleware/authmiddleWare");


route.post("/", authMiddleware,productController.createProduct);
route.get("/", authMiddleware,productController.productList);

module.exports = route;
