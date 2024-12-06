const express = require("express");
const router = express.Router();
const mainController = require("../controller/main");
router.get("/", mainController.homePage);
router.post("/", mainController.trackPage);
router.get("/login", mainController.loginPage);
router.post("/login", mainController.loginAuth);
module.exports = router;
