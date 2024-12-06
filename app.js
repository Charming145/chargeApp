const express = require("express");
const app = express();
const mainRoute = require("./routes/main");
const adminRoute = require("./routes/admin");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/chargeit").then((conn) => {
  if (!conn) {
    console.log("Connection to Db failed");
    return null;
  }
  console.log("Connection Established.");
});
app.use("/", mainRoute);
app.use("/admin", adminRoute);
let port = 3000;
app.listen(port, () => console.log(`server runinnig on port ${port}`));
