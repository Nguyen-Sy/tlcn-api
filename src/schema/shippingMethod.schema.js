const joi = require("joi")
const { positiveNumber, id } = require("./common.schema")

const shippingMethodName = joi.string()
const shippingMethodLogo = joi.string()
const shippingMethodPrice = positiveNumber

const createShippingMethodSchema = joi.object().keys({
	name: shippingMethodName.required(),
	logo: shippingMethodLogo.required(),
	price: shippingMethodPrice.required(),
})

const updateShippingMethodSchema = joi.object().keys({
	name: shippingMethodName,
	logo: shippingMethodLogo,
	price: shippingMethodPrice,
})

const shippingMethodIdSchema = joi.object().keys({ id })

module.exports = {
	createShippingMethodSchema,
	updateShippingMethodSchema,
	shippingMethodIdSchema,
}
