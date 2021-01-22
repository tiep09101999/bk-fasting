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
