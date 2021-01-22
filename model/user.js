const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  gender: { type: String, default: "Male" },
  avatar: { type: String, default: "avatar-default.jpg" },
  // kiểm tra user đã chọn plan fasting chưa
  plan: {
    // gồm 2 chức năng. ChooseAt ban đầu sẽ là thời điểm khi chọn 1 plan
    // khi ấn End fasting, ChooseAt sẽ update lấy thời điểm ấn end
    isChoose: { type: Boolean, default: false },
    name: String,
    planId: String,
    chooseAt: Number,
    // lượng nước đã uống khi chọn 1 plan
    water: {
      // lượng nước user đã uống
      waterDrunk: { type: Number, default: 0 },
      // lượng nước user chọn uống
      waterAmount: { type: Number, default: 300 },
    },
    // check xem đã End fasting 1 plan bất kì nào chưa
    isEndFasting: { type: Boolean, default: true },
  },
  facebook: {
    uid: String,
    token: String,
    email: { type: String, trim: true },
  },
  totalFastingDays: { type: Number, default: 0 },
  // tổng thời gian đã nhịn ăn
  cumulative: { type: Number, default: 0 },
  // kỉ lục số ngày liên tục nhịn ăn
  continuous: { type: Number, default: 0 },
  // lần nhịn ăn lâu nhất
  longestFast: { type: Number, default: 0 },
  trophies: { type: Number, default: 0 },
  goalWeight: { type: Number, default: 50 },

  createdAt: { type: Number, default: Date.now },
});

UserSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  findUserByFbUid(id) {
    return this.findOne({ "facebook.uid": id }).exec();
  },
  findUserByEmail(email) {
    return this.findOne({ "facebook.email": email }).exec();
  },
  findUserById(id) {
    return this.findOne({ _id: id }).exec();
  },
  updateUser(id, item) {
    return this.findByIdAndUpdate(id, item).exec();
  },
};

module.exports = mongoose.model("user", UserSchema);
