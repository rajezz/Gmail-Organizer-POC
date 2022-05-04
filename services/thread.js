const fs = require("fs");
const Thread = require("../models");

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
    const threadDoc = new Thread(thread)
    const valid = threadDoc.validateSync()
    console.error("Validate Doc result > ", valid)
    return
}