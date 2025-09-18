const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req?.headers?.token?.split("Bearer")[1];

    const validate = jwt.verify(token, process.env.JWT_EXPIRE_IN);

    const { id } = validate;

    const userExist = await User.findById(id).select("-password").lean();

    if (!userExist)
      throw new Error("You are un-authorised to perform this actions", 401);

    req.user = userExist;

    next();
  } catch (error) {
    throw new Error("You are un-authorised to perform this actions", 401);
  }
};
