"use strict"

const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "category"
const COLLECTION_NAME = "categories"

var categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		rootId: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		description: String,
		parentId: {
			type: Schema.Types.ObjectId,
			ref: DOCUMENT_NAME,
		},
		left: {
			type: Number,
			default: 0,
		},
		right: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)
module.exports = model(DOCUMENT_NAME, categorySchema)
