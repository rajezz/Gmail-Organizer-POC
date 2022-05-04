const {
	Schema,
	model
} = require("mongoose")

// Subdocument...
const MessageSchema = new Schema({
	messageId: { type: String, required: false, unique: true },
	messageHistoryId: { type: String, required: false },
	from: { name: String, email: String },
	labels: { type: [String] },
	description: { type: String, required: true },
	date: { type: String, required: true }
})

const ThreadSchema = new Schema(
	{
		threadId: { type: String, required: false, unique: true },
		threadHistoryId: { type: String, required: false },
		messages: { type: [MessageSchema], default: [] },
		user: {
			name: String,
			email: String
		},
		subject: { type: String, required: true },
		date: { type: String, required: true }
	},
	{
		timestamps: true
	}
)

module.exports = model("threads", ThreadSchema)
