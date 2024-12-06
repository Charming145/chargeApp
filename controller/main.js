const login = require("../model/login");
const device = require("../model/data");
exports.homePage = (req, res) => {
  res.render("index", { pageTitle: "Homepage" });
};
exports.loginPage = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
exports.trackPage = (req, res, next) => {
  const code = req.body.code;
  console.log(code);
  device.fetchDataByCode(code, (d) => {
    console.log(d);
    if (d.length != 0)
      return res.render("track", { pageTitle: "Tracking page", data: d[0] });
    res.redirect("/");
  });
};
exports.loginAuth = (req, res) => {
  login.confirmPassword(req.body, (isMatch) => {
    if (!isMatch) return res.redirect("/");
    res.redirect("/admin/dashboard");
  });
};
