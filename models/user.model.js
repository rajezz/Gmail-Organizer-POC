const { Schema, model } = require("mongoose")
const validator = require("validator")

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: false,
			trim: true
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Invalid email")
				}
			}
		},
		archiveContent: {
			type: String,
			required: true,
			trim: true
		}
	},
	{
		timestamps: true
	}
)

module.exports = model("user", UserSchema)
