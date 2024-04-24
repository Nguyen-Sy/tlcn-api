"use strict"

const {
	constant: { API_KEY_PERMISSIONS },
} = require("../helper")
const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "apiKey"
const COLLECTION_NAME = "apiKeys"

var apiKeySchema = new Schema(
	{
		key: {
			type: String,
			require: true,
			unique: true,
		},
		status: {
			type: Boolean,
			default: true,
		},
		permissions: {
			type: [String],
			require: true,
			enum: Object.values(API_KEY_PERMISSIONS),
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)
module.exports = model(DOCUMENT_NAME, apiKeySchema)
