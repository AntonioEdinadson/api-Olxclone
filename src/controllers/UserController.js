const mongoose = require("mongoose");
const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");

const State = require("../models/State");
const User = require("../models/User");
const Category = require("../models/Category");
const Ads = require("../models/Ad");

module.exports = {
  getStates: async (req, res) => {
    let states = await State.find();
    res.json({ states });
  },

  info: async (req, res) => {
    let token = req.query.token;

    const user = await User.findOne({ token: token });
    const state = await State.findById(user.state);
    const ads = await Ads.find({ idUser: user._id.toString() });

    let adList = [];

    for (let i in ads) {
      const cat = await Category.findById(ads[i].category);
      adsList.push({ ...ads[i], category: cat.slug });
    }

    res.json({
      name: user.name,
      email: user.email,
      state: state.name,
      ads: adList,
    });
  },

  editAction: async (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      res.json({ error: err.mapped() });
      return;
    }

    const data = matchedData(req);

    let updates = {};

    if (data.name) {
      updates.name = data.name;
    }

    if (data.email) {
      const emailCheck = await User.findOne({ email: data.email });

      if (emailCheck) {
        res.json({ error: "E-mail existente" });
        return;
      }
      updates.email = data.email;
    }

    if (data.state) {
      if (mongoose.Types.ObjectId.isValid(data.state)) {
        const stateCheck = await State.findById(data.state);

        if (!stateCheck) {
          res.json({ error: "Estado Inexistente" });
          return;
        }
      }

      updates.state = data.state;
    }

    if(data.password) {
      updates.passwordHash = await bcrypt.hash(data.password);
    }

    await User.findOneAndUpdate({ token: data.token }, { $set: updates });
    res.json({});
  },
};
