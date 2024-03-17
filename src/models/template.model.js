"use strict"

const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "template"
const COLLECTION_NAME = "templates"

var templateSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
		path: String,
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)
module.exports = model(DOCUMENT_NAME, templateSchema)
