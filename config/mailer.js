const nodeMailer = require("nodemailer");

require("dotenv").config();
let adminEmail = process.env.MAIL_USER;
let adminPassword = process.env.MAIL_PASSWORD;
let mailHost = process.env.MAIL_HOST;
let mailPort = process.env.MAIL_PORT;

// 3 tham so: to ( send cho ai ), subject ( chu de), content
let sendMail = (to, subject, htmlContent) => {
  console.log(adminEmail);
  console.log(adminPassword);
  console.log(mailHost);
  let transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // k su dung SSL - TLS vi dang o localhost
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  });
  let options = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(options); // tra ve promise
};

module.exports = sendMail;
