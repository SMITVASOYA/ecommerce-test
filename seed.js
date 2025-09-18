const admin = {
  firstName: "admin",
  lastName: "admin",
  role: "admin",
  email: "jose@yopmail.com",
  password: "Abcd@1234",
};

const User = require("./models/userSchema");
exports.seeder = async () => {
  const adminExist = await User.findOne({ email: admin?.email }).lean();

  if (!adminExist) {
    await User.create(admin);
  }
  console.log("Admin User created Successfully");
};
