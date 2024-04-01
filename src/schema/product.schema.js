const joi = require("joi")
const {
	uri,
	id,
	page,
	limit,
	sort,
	sortType,
	search,
} = require("./common.schema")

const productName = joi.string()
const productDescription = joi.string()
const productImages = joi.array().items(uri)
const productCategory = id
const productShop = id
const productAttributes = joi.object()
const productVariations = joi.array().items(joi.object())
const productId = id
const productPrice = joi.number().min(0)

const createProductSchema = joi.object().keys({
	name: productName.required(),
	description: productDescription.required(),
	images: productImages.required(),
	category: productCategory.required(),
	shop: productShop.required(),
	attributes: productAttributes,
	variations: productVariations,
	price: productPrice.required(),
})

const updateProductSchema = joi.object().keys({
	name: productName,
	description: productDescription,
	images: productImages,
	category: productCategory,
	attributes: productAttributes,
	variations: productVariations,
	price: productPrice,
})

const productIdSchema = joi.object({
	id: productId.required(),
})

const productQuerySchema = joi.object().keys({
	price: joi.string().custom((value, helper) => {
		if (!value.includes(","))
			return helper.message("Invalid format {from},{to}")
	}),
	category: joi.string(),
	search,
	page,
	limit,
	sort,
	sortType,
})

module.exports = {
	createProductSchema,
	updateProductSchema,
	productIdSchema,
	productQuerySchema,
}
