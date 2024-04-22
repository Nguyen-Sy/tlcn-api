const joi = require("joi")
const { id } = require("./common.schema")

const cartProductList = joi.array().items(
	joi.object().keys({
		_id: id,
		name: joi.string().required(),
		description: joi.string().required(),
		price: joi.number().required(),
		quantity: joi.number().integer(),
	}),
)

const updateCartSchema = joi.object().keys({
	product_list: cartProductList,
})

module.exports = {
	updateCartSchema,
}
