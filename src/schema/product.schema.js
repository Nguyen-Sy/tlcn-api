const joi = require("joi")
const {
	uri,
	id,
	page,
	limit,
	sortField,
	sortType,
	search,
} = require("./common.schema")

const productName = joi.string()
const productDescription = joi.string()
const productImages = joi.array().items(uri)
const productCategory = id
const productAttributes = joi.object()
const productVariations = joi.array().items(
	joi.object({
		name: joi.string().required(),
		options: joi.array(),
		images: joi.array(),
	}),
)
const productId = id
const productPrice = joi.number().min(0)
const productSkuList = joi.array().items(
	joi.object({
		tier_idx: joi.array().items(joi.number()).required(),
		price: joi.number().min(0).required(),
		is_default: joi.boolean(),
	}),
)

const createProductSchema = joi.object().keys({
	name: productName.required(),
	description: productDescription.required(),
	images: productImages.required(),
	category: productCategory.required(),
	attributes: productAttributes,
	variations: productVariations,
	price: productPrice,
	sku_list: productSkuList.required(),
})

const updateProductSchema = joi.object().keys({
	name: productName,
	description: productDescription,
	images: productImages,
	category: productCategory,
	attributes: productAttributes,
	variations: productVariations,
	price: productPrice,
	sku_list: productSkuList,
})

const productIdSchema = joi.object({
	id: productId.required(),
})

const productQuerySchema = joi.object().keys({
	price: joi.string().custom((value, helper) => {
		if (!value.includes(","))
			return helper.message("Invalid format {from},{to}")
		return value
	}),
	category: joi.string(),
	search,
	page,
	limit,
	sortField,
	sortType,
})

module.exports = {
	createProductSchema,
	updateProductSchema,
	productIdSchema,
	productQuerySchema,
}
