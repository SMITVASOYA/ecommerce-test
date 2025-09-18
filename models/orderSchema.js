const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    orderItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        orderStock: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
