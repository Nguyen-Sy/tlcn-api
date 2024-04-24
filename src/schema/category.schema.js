const joi = require("joi")
const { uri, id } = require("./common.schema")

const categoryName = joi.string()
const categoryDescription = joi.string()
const categoryImage = uri
const categoryParentId = id

const createCategorySchema = joi.object().keys({
	name: categoryName.required(),
	description: categoryDescription,
	image: categoryImage.required(),
	parent_id: categoryParentId,
})

const updateCategorySchema = joi.object({
	name: categoryName,
	description: categoryDescription,
	image: categoryImage,
})

const getChildCategorySchema = joi.object({
	parent_id: categoryParentId,
})

const categoryIdSchema = joi.object({
	id,
})

module.exports = {
	createCategorySchema,
	updateCategorySchema,
	getChildCategorySchema,
	categoryIdSchema,
}
