const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodMenuSchema = new Schema({
  idUser: String,
  idFood: String,
  // Loại đồ ăn
  category: String,
  // Tên đồ ăn
  name: String,
  // Đơn vị tính đồ ăn
  unit: String,
  // Lượng calo có trong thức ăn
  cal: { type: Number, default: 0 },
  // Lượng protein có trong thức ăn
  protein: { type: Number, default: 0 },
  // Chất béo trong thức ăn
  fat: { type: Number, default: 0 },
  carb: { type: Number, default: 0 },
  // Số lượng món ăn
  quantity: { type: Number, default: 1 },
  // Bữa ăn trong này: 1 - sáng, 2-trưa, 3-tối.
  buaId: { type: String, default: 'morning' }
}, {
  timestamps: true
});

const buaId = {
  morning: 'morning',
  noon: 'noon',
  night: 'night',
};

FoodMenuSchema.statics = {
  addFood(food) {
    return this.create(food);
  },
  getFoodsByUser(idUser) {
    return this.find({ idUser }).exec();
  },
  deleteFood(id) {
    return this.deleteOne({ _id: id });
  },
  getFoodByIdFood(idFood, buaId) {
    return this.findOne({ idFood, buaId });
  },
  updateFood(id, quantity) {
    return this.updateOne({ _id: id }, { quantity: quantity });
  }
}

module.exports = {
  model: mongoose.model('foodMenu', FoodMenuSchema),
  buaId,
};