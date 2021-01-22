const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PlanSchema = new Schema({
  planName: String,
  fastHours: Number,
  eatHours: Number,
  planType: {
    type: String,
    kindOf: String,
  },
});
// có 3 kiểu plan: week Plan, original plan ( các kế hoạch có sẵn của web),
// custom plan( kế hoạch với mốc thời gian tự tạo)
const PlanType = {
  custom: "custom",
  original: "original",
  week: "week",
};
// có 2 kiểu week Plan là bỏ bữa sáng và bỏ bữa tối
const weekPlanType = {
  skip_breakfast: "Bỏ bữa sáng",
  skip_dinner: "Bỏ bữa tối",
};
PlanSchema.statics = {
  createNew(item) {
    return this.create(item).exec();
  },
  // lấy toàn bộ Plan trong DB
  getAllPlans() {
    return this.find({}).exec();
  },
  findPlanById(id) {
    return this.findOne({ _id: id }).exec();
  },
  getAllPlansByType(type) {
    return this.find({ "planType.type": type }).exec();
  },
  /**
   * kindOf là kiểu của weekPlan: bỏ bữa sáng hoặc bỏ bữa tối
   */
  getAllPlansByKindOf(kindOf) {
    return this.find({ "planType.kindOf": kindOf }).exec();
  },
};

module.exports = {
  model: mongoose.model("plan", PlanSchema),
  planType: PlanType,
  weekPlanType: weekPlanType,
};
