const mongoose = require("mongoose");
const emailValidator = require("emailvalidator");
const bcrypt = require("bcrypt");

const usersSchema = mongoose.Schema({
  name: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: Number,
    required: true,
    validate: function () {
      return this.password == this.confirmPassword;
    },
  },
});

usersSchema.pre("save", function () {
  this.confirmPassword = undefined;
});

const usersModel = mongoose.model("userModel", usersSchema);
