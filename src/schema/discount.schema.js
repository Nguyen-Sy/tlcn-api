const joi = require("joi")

const {
	constant: { DISCOUNT_APPLY_TO, DISCOUNT_STATUS, DISCOUNT_TYPE },
} = require("../helper")
const {
	positiveInteger,
	positiveNumber,
	arrayId,
	page,
	limit,
	id,
} = require("./common.schema")

const discountName = joi.string()
const discountDescription = joi.string()
const discountCode = joi.string()
const discountValidFrom = joi.date()
const discountValidTo = joi.date()
const discountMaxDiscount = positiveInteger
const discountMaxUsagePerUser = positiveInteger
const discountMaxUsage = positiveInteger
const discountMinOrderValue = positiveNumber
const discountApplyTo = joi.string().valid(...DISCOUNT_APPLY_TO)
const discountProductList = arrayId
const discountType = joi.string().valid(...DISCOUNT_TYPE)
const discountValue = positiveInteger
const discountStatus = joi.string().valid(...DISCOUNT_STATUS)

const createDiscountSchema = joi.object().keys({
	name: discountName.required(),
	description: discountDescription.required(),
	code: discountCode.required(),
	valid_from: discountValidFrom.required(),
	valid_to: discountValidTo
		.required()
		.greater(joi.ref("valid_from"))
		.message("valid_to must be greater than valid_from"),
	max_discount: discountMaxDiscount.required(),
	max_usage_per_user: discountMaxUsagePerUser.required(),
	max_usage: discountMaxUsage.required(),
	min_order_value: discountMinOrderValue.required(),
	apply_to: discountApplyTo.required(),
	product_list: discountProductList.required(),
	type: discountType.required(),
	value: discountValue.required(),
})

const updateDiscountSchema = joi.object().keys({
	name: discountName,
	description: discountDescription,
	code: discountCode,
	valid_from: discountValidFrom,
	valid_to: discountValidTo.custom((value, helpers) => {
		if (value.valid_from && value.valid_to) {
			if (value.valid_to <= value.valid_from) {
				return helpers.error("any.invalid")
			}
		}
		return value
	}),
	max_discount: discountMaxDiscount,
	max_usage_per_user: discountMaxUsagePerUser,
	max_usage: discountMaxUsage,
	min_order_value: discountMinOrderValue,
	apply_to: discountApplyTo,
	product_list: discountProductList,
	type: discountType,
	value: discountValue,
	status: discountStatus,
})

const getDiscountSchema = joi.object().keys({
	page,
	limit,
	creator: id,
	status: discountStatus,
	apply_to: discountApplyTo,
})

const discountIdSchema = joi.object().keys({
	id,
})

module.exports = {
	createDiscountSchema,
	updateDiscountSchema,
	getDiscountSchema,
	discountIdSchema,
}
