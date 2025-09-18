const orderService = require("../services/orderService");
const { sendResponse } = require("../helpers/helpers");

exports.createOrder = async (req, res) => {
  await orderService.createOrder(req.body, req.user);
  sendResponse(res, "Order created successfully");
};

exports.updateOrderStatus = async (req, res) => {
  await orderService.updateOrderStatus(req.params.id, req.body, req.user);
  sendResponse(res, "Order status updated successfully");
};

exports.ordersFetched = async (req, res) => {
  const data = await orderService.getOrders(req.user);
  sendResponse(res, "Order fetched successfully", data);
};

exports.cancelOrder = async (req, res) => {
  await orderService.deleteOrder(req.params.id, req.user);
  sendResponse(res, "Order cancelled successfully");
};
