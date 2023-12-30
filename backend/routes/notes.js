const express = require("express");
const router = express.Router();

router.get("/", (res, req) => {
  res.json([]);
});

module.exports = router;
