const multer = require("multer");
const fsExtra = require("fs-extra");
const userModel = require("../model/user");
// lưu trữ ảnh avatar vào thư mục public/images/users
let storeAvatar = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/assets/images/users");
  },
  filename: (req, file, callback) => {
    let avatarName = `${Date.now()}-${file.originalname}`;
    callback(null, avatarName);
  },
});

let avatarUploadFile = multer({
  storage: storeAvatar,
}).single("avatar");

module.exports.updateAvatar = (req, res) => {
  avatarUploadFile(req, res, async () => {
    try {
      let updateUserItem = {
        avatar: req.file.filename,
        updateAt: Date.now(),
      };
      let userUpdate = await userModel.updateUser(req.user._id, updateUserItem);
      // xóa avatar cũ
      await fsExtra.remove(`public/assets/images/users/${userUpdate.avatar}`);
      let result = {
        message: "Cập nhật avatar thành công",
        imageSrc: `assets/images/users/${req.file.filename}`,
      };
      console.log(result.imageSrc);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
};

module.exports.updateUser = async (req, res) => {
  try {
    let updateUserItem = req.body;
    await userModel.updateUser(req.user._id, updateUserItem);
    let result = {
      message: "Cập nhật thông tin thành công",
    };
    console.log("Update info successed");
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};
