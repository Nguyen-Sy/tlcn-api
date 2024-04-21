const joi = require("joi")
const { uri, id } = require("./common.schema")

const categoryName = joi.string()
const categoryDescription = joi.string()
const categoryImage = uri
const categoryParentId = id

const createCategory = joi.object().keys({
	name: categoryName.required(),
	description: categoryDescription,
	image: categoryImage.required(),
	parent_id: categoryParentId,
})

const updateCategory = joi.object({
	name: categoryName,
	description: categoryDescription,
	image: categoryImage,
})

const getChildCategory = joi.object({
	parent_id: categoryParentId,
})

module.exports = {
	createCategory,
	updateCategory,
	getChildCategory,
}
