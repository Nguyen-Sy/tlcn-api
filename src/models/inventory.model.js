"use strict"

const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "inventory"
const COLLECTION_NAME = "inventories"

var inventorySchema = new Schema(
	{
		product_sku_id: {
			type: String,
			required: true,
		},
		shop: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ["in_used", "out_of_stock", "pending"],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, inventorySchema)
