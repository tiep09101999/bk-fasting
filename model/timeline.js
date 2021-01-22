const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let TimelineSchema = new Schema({
  userId: String,
  timeStart: Number,
  timeEnd: Number,
  // lương nước đã uống
  waterDrunk: { type: Number, default: 0 },
  // cân nặng
  weight: { type: Number, default: 55 },
  totalFastHours: { type: String, default: 0 },
  planName: String,
  takeNote: String,
});

TimelineSchema.statics = {
  // lấy toàn bộ timeline của 1 user trong DB theo thời gian giảm dần của timeEnd
  getAllTimelineByUserId(id) {
    return this.find({ userId: id }).sort({ timeEnd: -1 }).exec();
  },
  getLastedTimeLineByUserId(id) {
    return this.findOne({ userId: id }).sort({ timeEnd: -1 }).exec();
  },
  createNew(item) {
    return this.create(item);
  },
};

module.exports = mongoose.model("timeline", TimelineSchema);
