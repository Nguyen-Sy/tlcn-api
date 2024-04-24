"use strict"

const BaseRepository = require("./base.repo")
const { discount } = require("../models")

class DiscountRepo extends BaseRepository {
	constructor() {
		super(discount, "discount")
	}

	createDiscount = async ({
		name,
		description,
		code,
		valid_from,
		valid_to,
		creator,
		max_discount,
		max_usage_per_user,
		max_usage,
		min_order_value,
		apply_to,
		product_list,
		type,
		value,
	}) => {
		return await this.create({
			name,
			description,
			code,
			valid_from,
			valid_to,
			creator,
			max_discount,
			max_usage,
			max_usage_per_user,
			min_order_value,
			apply_to,
			product_list,
			type,
			value,
		})
	}
}

module.exports = new DiscountRepo()
