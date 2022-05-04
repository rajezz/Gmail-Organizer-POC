const express = require('express');
const { loadThreads } = require("../controllers/gmail.controller")
const { formatThreads } = require("../controllers/thread.controller")

const router = express.Router()

router.get("/load-threads", loadThreads)

router.get("/count-threads", formatThreads)

module.exports = router