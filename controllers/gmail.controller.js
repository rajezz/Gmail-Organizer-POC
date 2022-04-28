const axios = require("axios")
const qs = require("querystring")
const fs = require("fs")
const path = require("path")

const { formatThread } = require("../helpers/thread")
const { asyncForEach } = require("../helpers/common")
const { getBody, getGoogleOption, THREAD_URL } = require("../helpers/api")

let token

const getAccessToken = async () => {
	try {
		const tokenResponse = await axios.post(
			"https://oauth2.googleapis.com/token",
			qs.stringify(getBody())
		)

		const tokenData = tokenResponse.data

		console.log("Token", tokenData)

		return tokenData.access_token
	} catch (error) {
		console.error("getAccessToken | Error catched", error)
		throw error
	}
}

const fetchThread = async (id, index) => {
	console.log(`Start fetching thread - ${id} - count > ${index}`)
	return new Promise((resolve) => {
		setTimeout(async () => {
			try {
				const threadResponse = await axios.get(
					`${THREAD_URL}/${id}`,
					getGoogleOption(token)
				)
				const thread = threadResponse.data
				resolve([null, formatThread(thread)])
			} catch (error) {
				console.error("fetchThread | Error catched > ", error)
				resolve([error])
			}
		}, 500)
	})
}

const fetchThreads = async (storedThreads, pageToken = "") => {
	try {
		console.log("fetchThreads | method invoked!!")
		console.log("-------------------------------")
		console.log("storedThreads | count > ", Object.keys(storedThreads).length)
		console.log("pageToken > ", pageToken)

		let allThreads = storedThreads

		const threadsResponse = await axios.get(
			`${THREAD_URL}?maxResults=500${pageToken ? `&pageToken=${pageToken}` : ``}`,
			getGoogleOption(token)
		)

		const { threads, nextPageToken } = threadsResponse.data

		console.log("Thread length > ", threads.length)

		console.log("nextPageToken > ", nextPageToken)

		await asyncForEach(threads, async (threadInfo, index) => {
			const id = threadInfo.id
			if (allThreads[id]) {
				console.log(`Thread - ${id} is already stored!`)
				return
			}

			const [fetchError, thread] = await fetchThread(id, index)

			if (fetchError) return
			allThreads[id] = thread
		})

		return [allThreads, nextPageToken]
	} catch (error) {
		console.error("fetchThreads | Error catched >", error)
		throw error
	}
}

const getStoredThreads = (relativePath) => {
	try {
		const fileDate = fs.readFileSync(path.join(__dirname, relativePath))
		return JSON.parse(fileDate)
	} catch (error) {
		console.error("Error catched while getting Stored Threads > ", error)
		return {}
	}
}

const loadThreads = async (req, res) => {
	try {
		console.log("method - loadThreads called")

		const page_token = req.query.page_token

		let max_page = req.query.max_page ?? Number.POSITIVE_INFINITY

		token = await getAccessToken()

		let storedThreads = getStoredThreads("../threads.json")

		let nextPageToken = page_token ?? "",
			pageCount = 0

		console.log("max_page > ", max_page)

		do {
			console.log("pageCount > ", pageCount)
			;[storedThreads, nextPageToken] = await fetchThreads(storedThreads, nextPageToken)
			pageCount++

			// Writing the updated Thread data to the File System...
			fs.writeFileSync(
				path.join(__dirname, "../threads.json"),
				JSON.stringify(storedThreads, null, 2)
			)
		} while (nextPageToken && pageCount < max_page)

		console.log("Fetched all the required threads successfully!!")

		res.status(200).send("Successfully fetched Gmail messages...")
	} catch (error) {
		console.error("loadThreads | Error catched", error)
		return res.status(500).send(error.message ?? "Couldn't load Threads")
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

const formatThreads = () => {

}

exports.loadThreads = loadThreads
exports.countStoredThreads = countStoredThreads
