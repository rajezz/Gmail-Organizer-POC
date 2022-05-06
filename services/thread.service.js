const fs = require("fs");
const { Thread } = require("../models");
const path = require("path");

const MONGOOSE_UPDATE_OPTION = {
    new: true,
    upsert: true
}

exports.getStoredThreads = (relativePath) => {
    try {
        const fileDate = fs.readFileSync(path.join(__dirname, relativePath))
        return JSON.parse(fileDate)
    } catch (error) {
        console.error("Error catched while getting Stored Threads > ", error)
        return {}
    }
}

exports.validateAndSaveDoc = async (thread) => {
    try {
        const result = await Thread.findOneAndUpdate({ threadId: thread.threadId }, thread, MONGOOSE_UPDATE_OPTION)
        return true
    } catch (error) {
        console.error("Error catched > ", error)
        return false
    }
}