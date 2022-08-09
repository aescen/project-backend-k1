const express = require("express");

const loginRoutes = express.Router();

loginRoutes.post("/", (req, res) => {
  res.json({
    message: "test",
  });
});

module.exports = loginRoutes;
