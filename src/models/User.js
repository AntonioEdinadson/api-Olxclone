const mongoose = require("mongoose");
const {Schema} = mongoose;

mongoose.Promise = global.Promise;

const User = new Schema({
  name: String,
  email: String,
  passwordHash: String,
  state: String,
  token: String,
});

module.exports = mongoose.model('User', User);

