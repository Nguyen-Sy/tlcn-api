"use strict"

const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "userLogin"
const COLLECTION_NAME = "userLogins"

var userLoginSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			spare: true,
		},
		password: {
			type: String,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		facebook: {
			id: String,
			avatar: String,
			name: String,
			refreshToken: String,
		},
		google: {
			id: String,
			avatar: String,
			name: String,
			refreshToken: String,
		},
		refreshToken: String,
		refreshTokenUsed: [],
		token: {
			type: String,
			spare: true,
			unique: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)
module.exports = model(DOCUMENT_NAME, userLoginSchema)
