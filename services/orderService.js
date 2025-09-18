const Order = require("../models/orderSchema");
const productService = require("./productService");

class OrderService {
  createOrder = async (payload, user) => {
    try {
      const { orderItems } = payload;
      const createOrder = await Order.create({
        orderItems: orderItems,
        orderedBy: user?._id,
      });

      productService.productStockUpdate({
        products: createOrder?.orderItems,
        action: "decrease",
      });
    } catch (error) {
      throw new Error("Error during creating an order");
    }
  };
  getOrders = async (user) => {
    try {
      const matchObj = {};

      if (user?.role === "user") {
        matchObj.orderedBy = user?._id;
      }

      return await Order.find(matchObj)
        .populate("orderItems.productId", "name description price")
        .lean();
    } catch (error) {
      throw new Error("Error while fetching orders");
    }
  };

  updateOrderStatus = async (orderId, payload, user) => {
    try {
      if (user?.role !== "admin") {
        throw new Error("You are not authorized to cancelled the order.");
      }

      const orderExist = await this.orderExist(orderId);
      if (!orderExist) throw new Error("The order does not exist.");

      await Order.findByIdAndUpdate(orderId, { status: payload?.status });
      return;
    } catch (error) {
      throw new Error("Error while updating an order status");
    }
  };
  deleteOrder = async (orderId, user) => {
    try {
      const orderExist = await this.orderExist(orderId);

      if (!orderExist) throw new Error("The order does not exist.");

      if (orderExist?.orderedBy?.toString() !== user?._id?.toString())
        throw new Error("You are not authorized to cancelled the order.");

      if (orderExist?.status === "shipped")
        throw new Error(
          "You can not cancelled the order if the order is already shipped."
        );

      await Order.findByIdAndDelete(orderId);

      productService.productStockUpdate({
        products: orderExist?.orderItems,
        action: "increase",
      });
    } catch (error) {
      throw new Error("Error while cancelling an order");
    }

    orderExist = async (orderId) => {
      return await Order.findById(orderId).lean();
    };
  };
}

const orderService = new OrderService();

module.exports = orderService;
