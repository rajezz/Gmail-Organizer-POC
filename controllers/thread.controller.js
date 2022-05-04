const { extractUserInfo } = require("../helpers/thread");
const { sendResponse } = require("../helpers/common");
const { getStoredThreads, validateAndSaveDoc } = require("../services/thread");

const formatThreads = async (req, res) => {
    try {
        let storedThreads = getStoredThreads("../threads.json")

        for (const threadInfo of Object.values(storedThreads)) {
            let formattedThread = {
                threadId: threadInfo.threadId,
                threadHistoryId: threadInfo.threadHistoryId,
                messages: []
            }
            let firstMessageRead = false
            threadInfo.messages.forEach(messageInfo => {
                const user = extractUserInfo(messageInfo.from)
                
                const { messageId, messageHistoryId, subject, description, labels } = messageInfo
                
                const date = Date.parse(messageInfo.date) ? new Date(messageInfo.date).toUTCString() : new Date().toUTCString()

                // Check whether the message is first...
                if (!firstMessageRead) {
                    formattedThread = { ...formattedThread, user, subject, date }
                    firstMessageRead = true
                }

                formattedThread.messages.push({
                    messageId,
                    messageHistoryId,
                    from: user,
                    labels,
                    description,
                    date
                })
            })

            await validateAndSaveDoc(formattedThread)
        }
        return sendResponse(res, 200, "Successfully stored the data in DB")
    } catch (error) {
        console.error("formatThreads | Error catched", error)
        return sendResponse(res, 500, error.message ?? "Couldn't count Threads")
    }
}

module.exports = {
    formatThreads
}