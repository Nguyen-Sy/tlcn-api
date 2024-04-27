"use strict"
const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "shipping-method"
const COLLECTION_NAME = "shipping-methods"

var shippingMethodSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		logo: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, shippingMethodSchema)
