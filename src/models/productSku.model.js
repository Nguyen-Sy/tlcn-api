"use strict"

const mongoose = require("mongoose")
const { Schema, model } = mongoose

const DOCUMENT_NAME = "productSku"
const COLLECTION_NAME = "productSkus"

var productSkuSchema = new Schema(
	{
		sku_id: { type: String, required: true, unique: true },
		tier_idx: { type: Array, default: [0] },
		is_default: { type: Boolean, default: false },
		is_published: {
			type: Boolean,
			default: false,
		},
		is_deleted: {
			type: Boolean,
			default: false,
		},
		price: {
			type: Number,
			required: true,
		},
		priority_sort: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, productSkuSchema)
