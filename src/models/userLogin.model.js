"use strict"

const {
	constant: { USER_ROLES },
} = require("../helper")
const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "userLogin"
const COLLECTION_NAME = "userLogins"

var userLoginSchema = new Schema(
	{
		local: {
			email: {
				type: String,
				unique: true,
				spare: true,
			},
			password: {
				type: String,
			},
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
		verified: {
			type: Boolean,
			default: false,
		},
		refresh_token: String,
		refresh_tokens_used: [String],
		token: {
			type: String,
			spare: true,
			unique: true,
		},
		role: {
			type: String,
			default: USER_ROLES.USER,
			enum: Object.values(USER_ROLES),
		},
		isDelete: Boolean,
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)
module.exports = model(DOCUMENT_NAME, userLoginSchema)
