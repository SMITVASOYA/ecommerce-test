const { fieldsValidator } = require("../helpers/helpers");
const Product = require("../models/productSchema");

class ProductService {
  createproduct = async (payload, user) => {
    try {
      if (user?.role !== "admin")
        throw Error("You are not authorized to perform this action");

      const { name, description, price, stockQuantity, category } = payload;

      const validate = fieldsValidator(payload, [
        "name",
        "description",
        "price",
        "stockQuantity",
        "category",
      ]);
      if (typeof validate === "string") throw new Error(validate, 400);

      if (price === 0 || price < 0)
        throw new Error("Price value should be greater than 0");
      if (stockQuantity === 0 || stockQuantity < 0)
        throw new Error("Stock quantity value should be greater than 0");

      await Product.create({
        name,
        description,
        price,
        stockQuantity,
        category: category?.toLowerCase(),
        createdBy: user?._id,
      });

      return true;
    } catch (error) {
      throw new Error("Error while product create", 400);
    }
  };

  products = async (payload) => {
    try {
      const { category, skip, limit } = payload;

      const filters = {};

      if (category && category !== "") {
        filters.category = category;
      }
      if (rangeStart && rangeEnd && rangeStart >= rangeEnd) {
        filters.price = {
          $gte: Number(rangeStart),
          $lte: Number(rangeEnd),
        };
      }

      return await Product.find(filters).skip(skip).limit(limit).lean();
    } catch (error) {
      throw new Error("Error during products fetch", 400);
    }
  };

  productStockUpdate = async (payload) => {
    try {
      const { products, action = "decrease" } = payload;

      if (products?.length === 0 || products?.length < 0) return;

      const productsData = products?.reduce((acc, product) => {
        if (!acc[product?.productId]) {
          acc[product?.productId] = product?.stockQuantity;
        } else {
          acc[product?.productId] += product?.stockQuantity;
        }
        return acc;
      }, {});

      if (action === "decrease") {
        await Promise.all(
          Object.keys(productsData)?.map(async (productId) =>
            Product.findByIdAndUpdate(productId, {
              stockQuantity: { $inc: -productsData[productId] },
            })
          )
        );
      } else {
        await Promise.all(
          Object.keys(productsData)?.map(async (productId) =>
            Product.findByIdAndUpdate(productId, {
              stockQuantity: { $inc: +productsData[productId] },
            })
          )
        );
      }
      return;
    } catch (error) {
      throw new Error("Error during products stock update", 400);
    }
  };
}

const productService = new ProductService();

module.exports = productService;
