const express = require('express');
const { loadThreads } = require("../controllers/gmail.controller")
const router = express.Router()

router.get("/load-threads", loadThreads)

module.exports = router