const { discount } = require("../index")
const { Types } = require("mongoose")

const seedUser = async () => {
	await discount.collection.drop()
	await discount.create({
		_id: new Types.ObjectId("66273ac19860d9937ddb02a1"),
		name: "FREE_SHIP",
		description: "discount description",
		code: "FREE_SHIP",
		valid_from: Date.now(),
		valid_to: Date.now() + 5000000,
		creator: "65f7ec34086229fc88e93a48",
		max_discount: 20000,
		max_usage_per_user: 1,
		max_usage: 1000,
		used_count: 0,
		min_order_value: 100000,
		status: "active",
		apply_to: "delivery",
		type: "fix_amount",
		value: 20000,
	})
	await discount.create({
		_id: new Types.ObjectId("66273ac29860d9937ddb02ad"),
		name: "PRODUCT_ADMIN",
		description: "discount description",
		code: "PRODUCT_ADMIN",
		valid_from: Date.now(),
		valid_to: Date.now() + 5000000,
		creator: "65f7ec34086229fc88e93a48",
		max_discount: 20000,
		max_usage_per_user: 1,
		max_usage: 1000,
		used_count: 0,
		min_order_value: 100000,
		status: "active",
		apply_to: "product",
		type: "percent",
		value: 10,
	})
	await discount.create({
		_id: new Types.ObjectId("66273ac29860d9937ddb02b9"),
		name: "PRODUCT_FIX_SHOP",
		description: "discount description",
		code: "PRODUCT_FIX_SHOP",
		valid_from: Date.now(),
		valid_to: Date.now() + 5000000,
		creator: "65f7ec34086229fc88e93a4c",
		max_discount: 20000,
		max_usage_per_user: 1,
		max_usage: 1000,
		used_count: 0,
		min_order_value: 100000,
		status: "active",
		apply_to: "product",
		type: "fix_amount",
		value: 10000,
	})
	await discount.create({
		_id: new Types.ObjectId("66273ac29860d9937ddb02c5"),
		name: "PRODUCT_PERCENT_SHOP",
		description: "discount description",
		code: "PRODUCT_PERCENT_SHOP",
		valid_from: Date.now(),
		valid_to: Date.now() + 5000000,
		creator: "65f7ec34086229fc88e93a4c",
		max_discount: 20000,
		max_usage_per_user: 1,
		max_usage: 1000,
		used_count: 0,
		min_order_value: 100000,
		status: "active",
		apply_to: "product",
		type: "percent",
		value: 12,
	})
}

module.exports = seedUser
