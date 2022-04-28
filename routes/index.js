const express = require('express');
const { loadThreads, countStoredThreads } = require("../controllers/gmail.controller")
const router = express.Router()

router.get("/load-threads", loadThreads)

router.get("/count-threads", countStoredThreads)

module.exports = router