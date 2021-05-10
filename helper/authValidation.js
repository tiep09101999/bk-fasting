const { check } = require("express-validator");

let register = [
    check("email", "Email phải có dạng example@example.com").isEmail().trim(),

    check(
        "password",
        "Mật khẩu chứa ít nhất 3 kí tự, gồm chữ hoa, thường và kí tự đặc biệt"
    )
        .isLength({ min: 3 })
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{3,}$/
        ),
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check("password_confirmation", "Mật khẩu nhập lại không khớp").custom(
        (value, { req }) => value === req.body.password
    ),
];

module.exports = {
    register: register,
};
