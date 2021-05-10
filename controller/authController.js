
const { validationResult } = require("express-validator");
const authService = require("../service/authService");
module.exports.checkLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
};

module.exports.checkLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
};

// kiểm tra xem user đã chọn 1 kế hoạch nào đó chưa
module.exports.checkChoosePlan = (req, res, next) => {
  if (req.user.plan.isChoose) {
    return res.redirect("/countup");
  }
  next();
};

module.exports.postRegister = async (req, res) => {
  let errors = [];
  let success = [];

  let validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    let error = Object.values(validationError.mapped());
    error.forEach((e) => {
      errors.push(e.msg);
    });
    req.flash("errors", errors);
    return res.redirect("/register");
  }

  try {
    let notify = await authService.register(
      req.body.email,
      req.body.password,
      req.protocol,
      req.get("host")
    );
    success.push(notify);
    req.flash("success", success);
    return res.redirect("/login");
  } catch (error) {
    errors.push(error);
    req.flash("errors", errors);
    return res.redirect("/register");
  }
};

module.exports.verifyAccount = async (req, res) => {
  let errors = [];
  let success = [];
  try {
    let verifySuccess = await authService.verifyAcc(req.params.token);
    success.push(verifySuccess);
    req.flash("success", success);
    return res.redirect("/login");
  } catch (e) {
    errors.push(e);
    req.flash("errors", errors);
    return res.redirect("/register");
  }
};