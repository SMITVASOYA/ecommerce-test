const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database Connected Successfully"))
  .catch((error) => console.log(`Error in database connect: ${error}`));
