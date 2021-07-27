const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const Ad = new mongoose.Schema({
    idUser: string,
    state: string,
    category: string,
    title: string,
    image: [Object],
    price: Number,
    priceNegoccible: Boolean,
    description: string,
    views: Number,
    status: string,
    create_at: Date
});

module.exports = mongoose.model('Ad', Ad);