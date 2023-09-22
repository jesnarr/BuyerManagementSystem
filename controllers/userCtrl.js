const Users = require("../models/userModel");

const userCtrl = {
  create: async (req, res) => {
    try {
      const { name, email } = req.body;

      const user = await Users.findOne({ email });

      if (user)
        return res.status(400).json({ msg: "This email already exists" });

      let users = new Users({
        buyer_id: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
        email: email,
        name: name,
        status: 1, //Active
        role: 1, // Buyer
      });

      users = await users.save();
      res.json({
        message: "You have successfully added a new buyer",
        status: 201,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { name, email, status } = req.body;

      const buyer_id = req.params.id;
      await Users.findOneAndUpdate(
        { buyer_id },
        {
          email,
          name,
          status,
        }
      );

      res.json({
        message: `You have successfully updated ${name} details`,
        status: 200,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await Users.find();
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const users = await Users.findOne({ _id: req.params.id });
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  filterUser: async (req, res) => {
    try {
      let queryStr = JSON.stringify(req.query);
      queryStr = JSON.parse(
        queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, (match) => "$" + match)
      );

      const res = await Users.find(queryStr);

      res.json(res);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
