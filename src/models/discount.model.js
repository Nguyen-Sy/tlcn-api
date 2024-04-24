"use strict"
const {
	constant: { DISCOUNT_APPLY_TO, DISCOUNT_STATUS, DISCOUNT_TYPE },
} = require("../helper")
const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "discount"
const COLLECTION_NAME = "discounts"

var discountSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		code: { type: String, required: true, unique: true },
		valid_from: { type: Date, required: true },
		valid_to: { type: Date, required: true },
		creator: { type: Schema.Types.ObjectId, ref: "user" },
		max_discount: { type: Number, required: true },
		max_usage_per_user: { type: Number, required: true, default: 0 },
		max_usage: { type: Number, required: true },
		used_count: { type: Number, default: 0 },
		min_order_value: { type: Number, required: true },
		status: {
			type: String,
			enum: DISCOUNT_STATUS,
			default: "inactive",
		},
		apply_to: {
			type: String,
			enum: DISCOUNT_APPLY_TO,
		},
		product_list: { type: Array, default: [] },
		type: { type: String, enum: DISCOUNT_TYPE },
		value: { type: Number, required: true },
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

discountSchema.pre("save", function (next) {
	if (this.used_count > this.max_usage) {
		const err = new Error("Used count cannot exceed max usage")
		return next(err)
	}
	next()
})

module.exports = model(DOCUMENT_NAME, discountSchema)
