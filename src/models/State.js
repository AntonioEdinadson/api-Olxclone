const mongoose = require("mongoose");
const {Schema} = mongoose;

mongoose.Promise = global.Promise;

const State = new Schema({
  name: {type: String}
});

module.exports = mongoose.model('State', State);

