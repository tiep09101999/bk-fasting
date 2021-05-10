const FoodModel = require("../model/food");
const FoodMenuModel = require("../model/foodMenu");
const UserModel = require("../model/user");

// Lấy danh sách thực đơn của người dùng 
module.exports.getFoodForm = async (req, res) => {
  try {
    const categories = await FoodModel.getCategories();
    const foodsForm = await FoodMenuModel.model.getFoodsByUser(req.user._id);

    res.render("food_form", {
      user: req.user,
      categories,
      foods: foodsForm,
    })
  } catch (error) {
    return res.status(500).send(error);
  }
}

// Lấy các đồ ăn theo thể loại đồ ăn 
module.exports.getFoodsByCategory = async (req, res) => {
  try {
    const category = req.body.category;
    const foods = await FoodModel.findFoodByCategory(category);
    res.json({
      user: req.user,
      foods: foods
    })
  } catch (error) {
    return res.status(500).send(error);
  }
}

// Thêm đồ ăn vào các bữa ăn của người dùng
module.exports.addFoodToForm = async (req, res) => {
  try {
    const { idFood, category, name, unit, cal, protein, fat, carb, quantity, buaId } = req.body;
    const foodInDB = await FoodMenuModel.model.getFoodByIdFood(idFood, buaId);
    let foodSave;
    if (foodInDB) {
      foodSave = await FoodMenuModel.model.updateFood(foodInDB._id, +foodInDB.quantity + +quantity);
    } else {
      const food = {
        idUser: req.user._id,
        idFood,
        category,
        name,
        unit,
        cal,
        protein,
        fat,
        carb,
        quantity,
        buaId,
      };
      foodSave = await FoodMenuModel.model.addFood(food)
    }

    res.json({
      user: req.user,
      success: true,
      newFood: foodSave
    })
  } catch (error) {
    console.log('error ', error)
    return res.status(500).send(error);
  }
}

// Xóa đồ ăn khỏi các bữa ăn của người dùng
module.exports.deleteFoodToForm = async (req, res) => {
  try {
    const idForm = req.params.id;
    const foodDelete = await FoodMenuModel.model.deleteFood(idForm);
    res.json({
      user: req.user,
      success: true,
      oldFood: foodDelete,
    })
  } catch (error) {
    console.log('error ', error)
    return res.status(500).send(error);
  }
}

// Sửa lượng caloTarget của người dùng
module.exports.updateCaloTargetUser = async (req, res) => {
  try {
    const { caloTarget } = req.body;
    console.log('calo', caloTarget);
    await UserModel.updateCaloTarget(req.user._id, caloTarget);
    res.json({
      user: req.user,
      success: true,
      caloTarget,
    })
  } catch (error) {
    console.log('error ', error)
    return res.status(500).send(error);
  }
}
