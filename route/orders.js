const route = require("express").Router();
const { authMiddleware } = require("../middleware/authmiddleWare");
const orderController = require("../controller/orderController");

route.post("/", authMiddleware, orderController.createOrder);
route.get("/", authMiddleware, orderController.ordersFetched);
route.patch("/:id/status", authMiddleware, orderController.updateOrderStatus);
route.delete("/:id", authMiddleware, orderController.cancelOrder);

module.exports = route;
