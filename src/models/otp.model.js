"use strict"

const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "otp"
const COLLECTION_NAME = "otps"

var otpSchema = new Schema(
	{
		token: {
			type: Number,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		wrong_times: {
			type: Number,
			default: 0,
		},
		expired_at: {
			type: Date,
			// ? TTL index of mongodb. Mongodb will automatically check expire document every 1 min and delete the expired.
			// ! So it will create the delay, carefully to check it
			expires: 0,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, otpSchema)
