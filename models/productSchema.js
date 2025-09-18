const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    category: { type: String, required: true },
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"users"}
  },
  { timestamps: true }
);

productSchema.index({ price: 1, category: 1 });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

const Product = mongoose.model("products", productSchema);

module.exports = Product;
