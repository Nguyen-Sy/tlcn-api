"use strict"

const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "otp"
const COLLECTION_NAME = "otps"

var otpSchema = new Schema(
	{
		token: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		wrongTimes: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

otpSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 })
module.exports = model(DOCUMENT_NAME, otpSchema)
