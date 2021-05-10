const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  stt: { type: Number, default: 0 },
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
});

FoodSchema.statics = {
  findFoodById(id) {
    return this.findById(id).exec();
  },
  findFoodByCategory(category) {
    return this.find({ category: category });
  },
  getCategories() {
    return this.distinct('category');
  }
}

module.exports = mongoose.model('food', FoodSchema);
