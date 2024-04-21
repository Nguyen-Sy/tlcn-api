"use strict"

const mongoose = require("mongoose")
const slug = require("mongoose-slug-updater")
const { Schema, model } = mongoose

mongoose.plugin(slug)

const DOCUMENT_NAME = "product"
const COLLECTION_NAME = "products"

var productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		images: [String],
		category: { type: Schema.Types.ObjectId, ref: "category" },
		shop: { type: Schema.Types.ObjectId, ref: "user" },
		slug: { type: String, slug: "name", unique: true },
		attributes: Schema.Types.Mixed,
		rating: {
			type: Number,
			default: 4.5,
		},
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
		variations: [Object],
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

productSchema.index({ name: "text", description: "text" })

module.exports = model(DOCUMENT_NAME, productSchema)
