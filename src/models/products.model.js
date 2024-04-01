"use strict"

const { default: slugify } = require("slugify")
const { Schema, model } = require("mongoose")

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
		slug: String,
		attributes: Schema.Types.Mixed,
		variations: [Object],
		rating: {
			type: Number,
			default: 4.5,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
		isDeleted: {
			type: Boolean,
			default: false,
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

productSchema.index({ name: "text", description: "text" })

productSchema.pre("save", function (next) {
	if (!this.isModified("name")) {
		return next()
	}

	this.slug = slugify(this.name, { lower: true, trim: true })
	next()
})

module.exports = model(DOCUMENT_NAME, productSchema)
