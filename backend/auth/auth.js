const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
    try {
      const user =  User.findOne({ _id: req.user._id }).select("password");
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
  
  module.exports = router;
  