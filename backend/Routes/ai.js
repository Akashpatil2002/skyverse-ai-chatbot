const express = require("express");

const router = express.Router();

const {
  chatWithGemini
} = require("../Controller/aiController");

router.post("/chat", chatWithGemini);

module.exports = router;