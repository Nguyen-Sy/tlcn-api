const joi = require("joi")

const createCategory = joi.object({
	name: joi.string().required(),
	description: joi.string(),
	image: joi.string().uri().required(),
	parentId: joi.string(),
})

const updateCategory = joi.object({
	name: joi.string(),
	description: joi.string(),
	image: joi.string().uri(),
})

module.exports = {
	createCategory,
	updateCategory,
}
