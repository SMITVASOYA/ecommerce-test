const { sendResponse } = require("../helpers/helpers");
const userService = require("../services/userService");

exports.register = async (req, res) => {
  const data = await userService.register(req.body);

  sendResponse(res, "User registered successfullly.", data);
};

exports.login = async (req, res) => {
  const data = await userService.login(req.body);

  sendResponse(res, "User logged-in successfullly.", data);
};
