const route = require("express").Router();
const { authMiddleware } = require("../middleware/authmiddleWare");
const orderController = require("../controller/orderController");

route.use(authMiddleware);
route.post("/", orderController.createOrder);
route.get("/", orderController.getOrders);
route.patch("/:id/status", orderController.updateOrderStatus);
route.delete("/:id", orderController.cancelOrder);

module.exports = route;
