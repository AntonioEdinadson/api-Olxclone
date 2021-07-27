const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const category = new mongoose.Schema({
  name: string,
  slug: string,
});

module.exports = mongoose.model('Category', Category);