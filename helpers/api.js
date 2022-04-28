exports.getBody = () => ({
	refresh_token: process.env.REFRESH_TOKEN,
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET,
	grant_type: "refresh_token"
})

exports.getGoogleOption = (token) => ({
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`
	}
})

exports.THREAD_URL = "https://gmail.googleapis.com/gmail/v1/users/me/threads"
