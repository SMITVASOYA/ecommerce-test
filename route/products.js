const route = require("express").Router();
const productController = require("../controller/productController");
const { authMiddleware } = require("../middleware/authmiddleWare");


route.use(authMiddleware);
route.post("/", productController.createProduct);
route.get("/", productController.productList);

module.exports = route;
