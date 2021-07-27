const User = require("../models/User");

module.exports = {
  private: async (req, res, next) => {
    if (!req.query.token || req.body.token) {
      res.json({ message: "Token Invalid1" });
      return;
    }

    let token = "";

    if (req.body.token) {
      token = req.body.token;
    }
    
    if (req.query.token) {
      token = req.query.token;
    }

    if ((token = '')) {
      res.json({ message: "Token Invalid2" });
      return;
    }

    const user = await User.findOne({ token });

    if (!user) {
      console.log(token);
      res.json({ message: "Token Invalid3" });
      return;
    }

    next();
  },
};
