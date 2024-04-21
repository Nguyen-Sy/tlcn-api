"use strict"

const slugify = require("slugify")
const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "category"
const COLLECTION_NAME = "categories"

var categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		root_id: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		description: String,
		parent_id: {
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
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

categorySchema.pre("save", function (next) {
	if (!this.isModified("name")) {
		return next()
	}

	this.slug = slugify(this.name, { lower: true, trim: true })
	next()
})

module.exports = model(DOCUMENT_NAME, categorySchema)
