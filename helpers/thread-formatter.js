const threadMap = {
	id: "threadId",
	historyId: "threadHistoryId"
}
const messageMap = {
	id: "messageId",
	historyId: "messageHistoryId",
	labelIds: "labels",
	snippet: "description",
	sizeEstimate: "sizeEstimate"
}
const messageHeadersMap = {
	"Delivered-To": "deliveredTo",
	Date: "date",
	From: "from",
	"Reply-to": "replyTo",
	To: "to",
	Subject: "subject"
}

const filterObject = (obj, keyMap) => {
	let result = {}
	Object.keys(obj).forEach((key) => {
		if (keyMap[key]) {
			result[keyMap[key]] = obj[key]
		}
	})
	return result
}
const filterArray = (arr, keyMap) => {
	let result = {}
	arr.forEach((elem) => {
		const { name, value } = elem
		if (keyMap[name]) {
			result[keyMap[name]] = value
		}
	})
	return result
}

const formatThread = (thread) => {
	let formattedThread = { messages: [] }
	formattedThread = Object.assign(formattedThread, filterObject(thread, threadMap))
	thread.messages.map((message) => {
        formattedThread.messages.push({
			...filterObject(message, messageMap),
			...filterArray(message.payload.headers, messageHeadersMap)
		})
    })
    return formattedThread
}

module.exports = {
	formatThread
}
