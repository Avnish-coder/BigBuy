"use strict";
const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str,data) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "avnishsharma0420@gmail.com",
      pass: "vlmvxnuoutzosvso",
    },
  });

  let info = await transporter.sendMail({
    from: '<avnishsharma0420@gmail.com>',
    to: data,
    subject: "Thanks from Big Buy",
    text: "Thank you for Subscribing our news letter",
    html: "<h3>Thank you for Subscribing our news letter of Big Buy</h3>",
  });
}

