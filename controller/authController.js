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
