"use strict"
const {
	constant: { CART_STATUS },
} = require("../helper")
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
			enum: CART_STATUS,
			default: "active",
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)
module.exports = model(DOCUMENT_NAME, cartSchema)
