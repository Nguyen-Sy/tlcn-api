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
	parentId: categoryParentId,
})

const updateCategory = joi.object({
	name: categoryName,
	description: categoryDescription,
	image: categoryImage,
})

module.exports = {
	createCategory,
	updateCategory,
}
