const { BadRequestError } = require("../core/error.response")
const { discountRepo } = require("../repository")

class DiscountService {
	static applyDiscount = async (code) => {
		try {
			await discountRepo.findOneAndUpdate(
				{ code },
				{ $inc: { used_count: 1 } },
			)
			return true
		} catch {
			return false
		}
	}

	static createDiscount = async ({
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
		const existedDiscount = await discountRepo.find({ code })
		if (
			existedDiscount.status != "inactive" ||
			existedDiscount.valid_to < new Date()
		)
			throw new BadRequestError("Discount with this code already created")
		return await discountRepo.createDiscount({
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

	static deleteDiscount = async ({ code, creator }) => {
		const existedDiscount = await discountRepo.findOne({
			code,
			creator,
		})
		if (
			existedDiscount.status == "active" ||
			(existedDiscount.valid_from < new Date() &&
				existedDiscount.valid_to > new Date())
		) {
			throw new BadRequestError("Discount is active")
		}
		await discountRepo.findOneAndDelete({ code, creator })
		return true
	}

	static getDiscount = async ({ page, limit, creator, status, apply_to }) => {
		const filter = { creator, status, apply_to }
		Object.keys(filter).forEach((key) => !filter[key] && delete filter[key])

		const discounts = await discountRepo.find(filter)
		return {
			items: discounts.slice((page - 1) * limit, page * limit),
			page,
			limit,
			total_page: Math.ceil(discounts.length / limit),
		}
	}

	static updateDiscount = async ({
		name,
		description,
		creator,
		status,
		valid_from,
		valid_to,
		max_discount,
		code,
		max_usage,
		max_usage_per_user,
		min_order_value,
		apply_to,
		product_list,
		type,
		value,
	}) => {
		const existedDiscount = await discountRepo.find({ code, creator })
		if (!existedDiscount) {
			throw new BadRequestError("Discount is not existed")
		}

		const currentDate = new Date()
		if (existedDiscount.valid_to < currentDate) {
			existedDiscount.status = status ?? existedDiscount.status
		}

		if (existedDiscount.valid_from > currentDate) {
			const updateFields = {
				name,
				description,
				valid_from,
				valid_to,
				code,
				max_discount,
				max_usage,
				max_usage_per_user,
				min_order_value,
				apply_to,
				product_list,
				type,
				value,
			}
			Object.keys(updateFields).forEach((key) => {
				existedDiscount[key] = updateFields[key] ?? existedDiscount[key]
			})
		}

		return await discountRepo.findOneAndUpdate(
			{ code, creator },
			existedDiscount,
		)
	}
}

module.exports = DiscountService
