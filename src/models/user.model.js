"use strict"

const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "user"
const COLLECTION_NAME = "users"

var userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			spare: true,
		},
		phone: String,
		name: String,
		description: String,
		addresses: [Object],
		avatar: String,
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)
module.exports = model(DOCUMENT_NAME, userSchema)
