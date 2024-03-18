"use strict"

const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "shopRegister"
const COLLECTION_NAME = "shopRegisters"

var shopRegisterSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			spare: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)
module.exports = model(DOCUMENT_NAME, shopRegisterSchema)
