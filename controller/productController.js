const { sendResponse } = require("../helpers/helpers");
const productService = require("../services/productService");

exports.createProduct = async (req, res) => {
  await productService?.createproduct(req.body, req?.user);
  sendResponse(res, "Product created successfully.");
};

exports.productList = async (req, res) => {
  const products = await productService?.products(req.query, req?.user);
  sendResponse(res, "Products fetched successfully.", products);
};
