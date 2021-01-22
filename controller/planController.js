const PlanModel = require("../model/plan");

module.exports.getWeekPlan = async (req, res) => {
  try {
    let skipBreakfastPlans = await PlanModel.model.getAllPlansByKindOf(
      PlanModel.weekPlanType.skip_breakfast
    );

    let skipDinnerPlans = await PlanModel.model.getAllPlansByKindOf(
      PlanModel.weekPlanType.skip_dinner
    );

    let data = {
      skipBreakfastPlans: skipBreakfastPlans,
      skipDinnerPlans: skipDinnerPlans,
    };
    return res.render("plan", { user: req.user, plans: data });
  } catch (error) {
    return res.status(500).send(error);
  }
};
