const { resolve, reject } = require("bluebird");
const PlanModel = require("../model/plan");

module.exports.getHome = async (req, res) => {
  if (req.user.plan.isChoose) return res.redirect("/countup");
  try {
    let planCustom = await PlanModel.model.getAllPlansByType(
      PlanModel.planType.custom
    );
    let planOriginal = await PlanModel.model.getAllPlansByType(
      PlanModel.planType.original
    );
    let plans = Object.assign(planCustom, planOriginal);

    // let data = {
    //   user: req.user,
    //   plans: plans,
    // };
    return res.render("choose", { user: req.user, plans: plans });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports.getCountUp = async (req, res) => {
  if (!req.user.plan.isChoose) res.redirect("/");
  if (req.user.plan.name !== "custom") {
    let nd = new Date(req.user.plan.chooseAt);
    let plan = await PlanModel.model.findPlanById(req.user.plan.planId);
    nd.setHours(nd.getHours() + plan.fastHours);
    let newDate = new Date(nd);
    // lấy định dạng HH:MM lúc bắt đầu

    res.render("countdown_home", {
      user: req.user,
      newDate: newDate,
      flag: true,
    });
  } else {
    res.render("countdown_home", {
      user: req.user,
      flag: false,
    });
  }
};
