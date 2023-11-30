const mongoose = require("mongoose");
const { Schema } = mongoose;

//user schema
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  userType: String,
  language: String,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
