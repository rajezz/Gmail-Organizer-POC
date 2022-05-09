const { extractUserInfo } = require("../helpers/thread")
const { sendResponse, delayProcess } = require("../helpers/common")
const { getStoredThreads, validateAndSaveDoc } = require("../services/thread.service")

const formatAndStoreThreads = async (req, res) => {
	try {
		console.log("formatAndStoreThreads called")

		let storedThreads = getStoredThreads("../threads.json")

		for (const threadInfo of Object.values(storedThreads)) {
			console.log("Processing thread: ", threadInfo.threadId)

			let formattedThread = {
				threadId: threadInfo.threadId,
				threadHistoryId: threadInfo.threadHistoryId,
				messages: []
			}
			let firstMessageRead = false
			threadInfo.messages.forEach((messageInfo) => {
				const user = extractUserInfo(messageInfo.from)

				const { messageId, messageHistoryId, subject, description, labels } = messageInfo

				const date = Date.parse(messageInfo.date)
					? new Date(messageInfo.date).toUTCString()
					: new Date().toUTCString()

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
            
			console.log("Saved!!")
            
            await delayProcess(500)
		}
		return sendResponse(res, 200, "Successfully stored the data in DB")
	} catch (error) {
		console.error("formatAndStoreThreads | Error catched", error)
		return sendResponse(res, 500, error.message ?? "Couldn't store Threads")
	}
}

const countStoredThreads = async (req, res) => {
	try {
		let storedThreads = getStoredThreads("../threads.json")
		res.status(200).send({ threadCount: Object.keys(storedThreads).length })
	} catch (error) {
		console.error("countStoredThreads | Error catched", error)
		return res.status(500).send(error.message ?? "Couldn't count Threads")
	}
}

module.exports = {
	formatAndStoreThreads,
	countStoredThreads
}
