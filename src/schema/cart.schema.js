const joi = require("joi")

const updateCartSchema = joi.object().keys({
	product_sku_id: joi.string().required(),
	quantity: joi.number().integer().required(),
})

module.exports = {
	updateCartSchema,
}
