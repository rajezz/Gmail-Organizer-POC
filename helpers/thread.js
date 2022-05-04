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

const extractUserInfo = (userStr) => {
	try {
		const emailRegMatch = userStr.match(/<[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*>/g)

		if (!(Array.isArray(emailRegMatch) && emailRegMatch.length > 0)) throw new Error("Couldn't find a Valid Email from the string!")

		const email = emailRegMatch[0].replace("<", "").replace(">", "")
		const name = userStr.replace(emailRegMatch[0], "").trim()
		return { name, email }
	} catch (error) {
		console.error("extractUserInfo | Error catched > ", error)
		return {
			name: "N/A",
			email: "N/A",
		}
	}
}

module.exports = {
	formatThread, extractUserInfo
}
