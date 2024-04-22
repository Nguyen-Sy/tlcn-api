"use strict"

const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "cart"
const COLLECTION_NAME = "carts"

var cartSchema = new Schema(
	{
		products: {
			type: Array,
			default: [],
		},
		status: {
			type: String,
			enum: ["active", "completed", "failed", "pending"],
			default: "active",
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)
module.exports = model(DOCUMENT_NAME, cartSchema)
