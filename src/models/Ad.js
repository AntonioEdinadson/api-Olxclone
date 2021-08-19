const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const Ad = new mongoose.Schema({
    idUser: String,
    state: String,
    category: String,
    title: String,
    image: [Object],
    price: Number,
    priceNegotiable: Boolean,
    description: String,
    views: Number,
    status: String,
    create_at: Date
});

module.exports = mongoose.model('Ad', Ad);