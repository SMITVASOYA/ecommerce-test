const express = require("express");
require("dotenv").config();
require("./connection/connection");

const app = express();
const PORT = process.env.PORT || 3000;
const route = require("./route");
const { seeder } = require("./seed");

app.use(express.json());

app.use("/", route);

app.listen(PORT, async () => {
  await seeder();
  console.log(`Server started on port: ${PORT}`);
});
