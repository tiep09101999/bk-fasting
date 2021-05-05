const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let SubscriptionSchema = new Schema({
  //  userId: String,
  userId: String,
  subscriptionId: String,
  subscription: Object,
  createdAt: Number,
});

SubscriptionSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  // check xem user da chap nhan thong bao chua
  findSub(id) {
    return this.findOne({ subscriptionId: id }).exec();
  },

  findLastSub(userId) {
    return this.findOne({ userId: userId }).sort({ createdAt: -1 }).exec();
  },
  findSubByUserId(id) {
    return this.find({ userId: id }).exec();
  },
};
module.exports = mongoose.model("subscription", SubscriptionSchema);
