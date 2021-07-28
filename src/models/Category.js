const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const Category = new mongoose.Schema({
  name: String,
  slug: String,
});

module.exports = mongoose.model('Category', Category);