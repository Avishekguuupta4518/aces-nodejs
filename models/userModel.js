const mongoose = require("mongoose");
const schema = mongoose.Schema; //two necessary lines while creating table

const userSchema = new schema({
  //object of a class named Schema
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
