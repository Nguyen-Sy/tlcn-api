const joi = require("joi")
const { uri, id } = require("./common.schema")

const productName = joi.string()
const productDescription = joi.string()
const productImages = joi.array().items(uri)
const productCategory = id
const productShop = id
const productAttributes = joi.object()
const productVariations = joi.array().items(joi.object())
const productId = id

const createProductSchema = joi.object({
	name: productName.required(),
	description: productDescription.required(),
	images: productImages.required(),
	category: productCategory.required(),
	shop: productShop.required(),
	attributes: productAttributes,
	variations: productVariations,
})

const updateProductSchema = joi.object({
	name: productName,
	description: productDescription,
	images: productImages,
	category: productCategory,
	attributes: productAttributes,
	variations: productVariations,
})

const productIdSchema = joi.object({
	id: productId.required(),
})

module.exports = {
	createProductSchema,
	updateProductSchema,
	productIdSchema,
}
