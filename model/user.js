const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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
    // thời gian khi user click bắt đầu kế hoạch custom Plan ( k phải thời gian chọn trong input)
    chooseCustomPlan: { type: Number, default: 0 },
    // lượng nước đã uống khi chọn 1 plan
    water: {
      // lượng nước user đã uống
      waterDrunk: { type: Number, default: 0 },
      // lượng nước user chọn uống
      waterAmount: { type: Number, default: 300 },
    },
    // check xem đã End fasting 1 plan bất kì nào chưa
    isEndFasting: { type: Boolean, default: true },
    planType: String,
  },
  // khoảng thời gian nếu user chọn "nhắc tôi sau"
  isReminder: { type: Number, default: 0 },
  // thông tin khi user đăng nhập bằng local
  local: {
    email: { type: String, trim: true },
    password: String,
    isActive: { type: Boolean, default: false },
    verifyToken: String,
  },
  // lưu thông tin khi login bằng fb
  facebook: {
    uid: String,
    token: String,
    email: { type: String, trim: true },
  },
  // tổng ngày đã nhịn ăn
  totalFastingDays: { type: Number, default: 0 },
  // tổng thời gian đã nhịn ăn
  cumulative: { type: Number, default: 0 },
  // kỉ lục số ngày liên tục nhịn ăn
  continuous: { type: Number, default: 0 },
  // lần nhịn ăn lâu nhất
  longestFast: { type: Number, default: 0 },
  trophies: { type: Number, default: 0 },
  // cân nặng hiện tại
  currentWeight: { type: Number, default: 50 },
  // cân nặng mong đợi
  goalWeight: { type: Number, default: 50 },
  // thời gian tài khoản được tạo
  createdAt: { type: Number, default: Date.now },
  // thời gian khi sửa thông tin
  updateAt: { type: Number, default: null },
  // Lượng calo mục tiêu cần đạt được
  caloTarget: { type: Number, default: 0 },
});

UserSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  verify(token) {
    return this.findOneAndUpdate(
      { "local.verifyToken": token },
      {
        "local.isActive": true,
        "local.verifyToken": null,
      }
    ).exec();
  },
  removeById(id) {
    return this.findOneAndRemove({ _id: id }).exec();
  },
  findByEmailLocal(email) {
    return this.findOne({ "local.email": email }).exec();
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
  updateCaloTarget(id, calo) {
    return this.updateOne({ _id: id }, { caloTarget: calo });
  }
};

UserSchema.methods = {
  comparePassword(password) {
    // tra ve 1 promise
    return bcrypt.compare(password, this.local.password);

  },
};

module.exports = mongoose.model("user", UserSchema);
