const axios = require("axios")
const qs = require("querystring")
const fs = require('fs');

let token

const getBody = () => ({
	refresh_token: process.env.REFRESH_TOKEN,
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET,
	grant_type: "refresh_token"
})

const googleOption = (token) => ({
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`
	}
})

const THREAD_URL = "https://gmail.googleapis.com/gmail/v1/users/me/threads"

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

const formatThread = (thread) => {

}

const fetchThread = async (id) => {
    console.log(`Start fetching thread - ${id}`)
    return new Promise((resolve) => {
        setTimeout(async () => {
            try {
                const threadResponse = await axios.get(`${THREAD_URL}/${id}`, googleOption(token))
                const thread = threadResponse.data
                resolve([null, formatThread(thread)])
            } catch (error) {
                console.error("fetchThread | Error catched > ", error)
                resolve([error])
            }
            
        }, 500)
        
    })
}

const loadThreads = async (req, res) => {
	try {
		console.log("method - loadThreads called")

		token = await getAccessToken()

		const storedThreads = require("../threads.json")

		const threadsResponse = await axios.get(THREAD_URL, googleOption(token))

		const threads = threadsResponse.data.threads

		for (let index = 0; index < 10; index++) {
			const id = threads[index].id
			if (storedThreads[id]) {
				console.log(`Thread - ${id} is already stored!`)
				break
			}

			await fetchThread(id)
		}

		res.status(200).send("Successfully fetched Gmail messages...")
	} catch (error) {
		console.error("loadThreads | Error catched", error)
		return res.status(500).send(error.message ?? "Couldn't load Threads")
	}
}

exports.loadThreads = loadThreads
