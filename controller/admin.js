const device = require("../model/data");
exports.adminHome = (req, res, next) => {
  res.render("admin/dashboard", { pageTitle: "Dashboard" });
};
exports.getAddDevice = (req, res, next) => {
  res.render("admin/addDevice", { pageTitle: "Add Device" });
};
exports.getChargeRecord = (req, res, next) => {
  device.fetchData((d) => {
    res.render("admin/deviceRecord", {
      pageTitle: "Charging Record.",
      data: d,
    });
  });
};
exports.getChargeRecordApi = (req, res, next) => {
  device.fetchData((d) => {
    return res.json(d);
  });
};
exports.getDevice = (req, res, next) => {
  const param = req.params.id;
  device.fetchDataById(param, (d) => {
    if (d) return res.json(d);
  });
};
exports.postAddDevice = (req, res, next) => {
  const { name, phone_qty, pb_qty, laptop_qty } = req.body;

  if (
    (phone_qty == "" || phone_qty == 0) &&
    (pb_qty == "" || pb_qty == 0) &&
    (laptop_qty == "" || laptop_qty == 0)
  ) {
    return res.json({
      status: false,
      message: "You must atleast register one device. ",
    });
  }
  device.addDevice(req.body, (d) => {
    if (d) res.json({ status: true, message: d });
  });
};
exports.updateRecord = (req, res, next) => {
  device.updateData(req.body, (done) => {
    if (done) return res.json({ status: true });
    return res.json({ status: false });
  });
};
exports.getLog = (req, res, next) => {
  const curF = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });
  let tph = {
    qty: 0,
    unit_price: 100,
    totalAmount: 0,
    calTotal() {
      this.totalAmount = this.qty * this.unit_price;
    },
  };
  let tpb = {
    qty: 0,
    unit_price: 200,
    totalAmount: 0,
    calTotal() {
      this.totalAmount = this.qty * this.unit_price;
    },
  };
  let tlp = {
    qty: 0,
    unit_price: 500,
    totalAmount: 0,
    calTotal() {
      this.totalAmount = this.qty * this.unit_price;
    },
  };
  device.fetchData((d) => {
    console.log(d);
    d.forEach((el) => {
      if (el.phone_qty) {
        tph.qty += el.phone_qty;
        tph.calTotal();
      }
      if (el.pb_qty) {
        tpb.qty += el.pb_qty;
        tpb.calTotal();
      }
      if (el.laptop_qty) {
        tlp.qty += el.laptop_qty;
        tlp.calTotal();
      }
    });
    res.render("admin/log", { pageTitle: "Logs", tph, tpb, tlp, curF });
  });
};
