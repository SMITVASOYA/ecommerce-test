const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { fieldsValidator, emailValidator } = require("../helpers/helpers");

class UserService {
  register = async (payload) => {
    try {
      const { email, password, firstName, lastName } = payload;

      const validate = fieldsValidator(payload, [
        "email",
        "password",
        "firstName",
        "lastName",
      ]);
      if (typeof validate === "string") throw new Error(validate, 400);

      if (!emailValidator(email?.toLowerCase()))
        throw new Error("Email is not valid");

      const isuserExist = await User.findOne({ email }).lean();

      if (isuserExist)
        throw new Error("User is already exist with same email.");

      const hashPassword = this.passwordHash(password);

      const newUser = await User.create({
        email: email?.toLowerCase(),
        password: hashPassword,
        firstName,
        lastName,
      });

      return this.tokenGenerator(newUser?.toObject());
    } catch (error) {
      throw new Error("Something went wrong!", 400);
    }
  };

  passwordHash = async (password) => {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error("Error during password encryption", 400);
    }
  };

  tokenGenerator = async (payload) => {
    try {
      const token = jwt.sign(
        { id: payload?._id?.toString(), role: payload?.role },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE_IN,
        }
      );

      return {
        token,
        user: {
          email: payload?.email,
          firstName: payload?.firstName,
          lastName: payload?.lastName,
          role: payload?.role,
        },
      };
    } catch (error) {
      throw new Error("Something went wrong!", 400);
    }
  };

  login = async (payload) => {
    try {
      const { email, password } = payload;

      const validate = fieldsValidator(payload, ["email", "password"]);
      if (typeof validate === "string") throw new Error(validate, 400);

      const isuserExist = await User.findOne({
        email: email?.toLowerCase(),
      }).lean();

      if (!isuserExist) throw new Error("User is not exist with this email.");

      const validatepassword = await bcrypt.compare(
        isuserExist?.password,
        password
      );

      if (!validatepassword) throw new Error("Email or password is incorrect.");

      delete isuserExist.password;
      return this.tokenGenerator(isuserExist);
    } catch (error) {
      throw new Error("Something went wrong!", 400);
    }
  };
}

const userService = new UserService();

module.exports = userService;
