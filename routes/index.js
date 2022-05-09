const express = require("express")
const { loadThreads } = require("../controllers/gmail.controller")
const { formatAndStoreThreads, countStoredThreads } = require("../controllers/thread.controller")

const router = express.Router()

router.get("/load-threads", loadThreads)

router.get("/count-threads", countStoredThreads)

router.get("/store-threads", formatAndStoreThreads)

module.exports = router
