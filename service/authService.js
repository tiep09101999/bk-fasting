const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const sendMail = require("../config/mailer");
const userModel = require("../model/user");

let saltRounds = 7;
module.exports.verifyAcc = (token) => {
  return new Promise(async (resolve, reject) => {
    await UserModel.verify(token);
    resolve("Tài khoản đã kích hoạt thành công");
  });
};

module.exports.register = async (email, password, protocol, host) => {
  return new Promise(async (resolve, reject) => {
    let userByEmail = await UserModel.findByEmailLocal(email);
    if (userByEmail) {
      if (!userByEmail.local.isActive) {
        return reject("Tài khoản đã tồn tại nhưng chưa được kích hoạt");
      }
      return reject("Email đã tồn tại");
    }
    let salt = bcrypt.genSaltSync(saltRounds);

    let userItem = {
      username: email.split("@")[0],

      local: {
        email: email,
        password: bcrypt.hashSync(password, salt),

        verifyToken: uuidv4(),
      },
    };
    console.log(userItem);

    let user = await UserModel.createNew(userItem);
    let link = `${protocol}://${host}/verify/${user.local.verifyToken}`;
    let content = `
        <h2>Bạn nhận được email này vì đã đăng kí tài khoản</h2>
        <h3> Vui lòng click vào link bên dưới để xác nhận </h3>
        <a href="${link}" target="blank">${link}</a>
        `;
    sendMail(email, "Verify account !!", content)
      .then((success) => resolve("Kiểm tra email để xác thực tài khoản"))
      .catch(async (e) => {
        await UserModel.removeById(user._id);
        reject("Có lỗi khi xác thực");
      });
  });
};
