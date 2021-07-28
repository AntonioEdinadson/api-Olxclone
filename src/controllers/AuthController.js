const mongoose = require("mongoose");
const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const State = require("../models/State");

module.exports = {
  signin: async (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      res.json({ error: err.mapped() });
      return;
    }

    const data = matchedData(req);

    // VALIDANDO E-MAIL
    const user = await User.findOne({ email: data.email });
    
    if (!user) {
      res.json({ error: "E-mail e/ou senha errados!"});
      return;
    }

    // VALIDANDO SENHA
    const match = await bcrypt.compare(data.password, user.passwordHash);

    if(!match) {
      res.json({ error: "E-mail e/ou senha errados!"});
      return;
    }

    //  CRIANDO TOKEN
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    user.token = token;

    await user.save();
    res.json({token, email: data.email});

  },

  signup: async (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      res.json({ error: err.mapped() });
      return;
    }

    const data = matchedData(req);

    // VERIFICAÇÃO DE E-MAIL
    if (!mongoose.Types.ObjectId.isValid(data.state)) {
      res.json({ err: { state: { msg: "ID ESTADO INVALIDO" } } });
      return;
    }

    const user = await User.findOne({ email: data.email });

    if (user) {
      res.json({ err: { email: { msg: "Email existente!" } } });
      return;
    }

    // VERIFICAÇÃO DE ESTADO
    const stateItem = await State.findById(data.state);

    if (!stateItem) {
      res.json({ err: { email: { msg: "Estado inexistente!" } } });
      return;
    }

    // CRIANDO HASH PASSWORD
    const passwordHash = await bcrypt.hash(data.password, 10);

    //  CRIANDO TOKEN
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    // CRIANDO USUARIO;
    const newUser = new User({
      name: data.name,
      email: data.email,
      passwordHash: passwordHash,
      state: data.state,
      token: token,
    });

    await newUser.save();
    res.json({ token: token });
  },
};
