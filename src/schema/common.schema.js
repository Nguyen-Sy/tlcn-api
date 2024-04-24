const joi = require("joi")
const { isValidObjectId } = require("mongoose")

const page = joi.number().min(1).integer()
const limit = joi.number().min(5).integer()
const search = joi.string()
const sortField = joi.string()
const sortType = joi.string().valid("asc", "desc")

const email = joi.string().email()
const password = joi
	.string()
	.regex(
		/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
		"strong password",
	)
const uri = joi.string().uri()
const id = joi.string().custom((value, helper) => {
	if (!isValidObjectId(value)) return helper.message("Invalid objectId")
	return value
})
const phoneNumber = joi
	.string()
	.regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number")

const positiveInteger = joi.number().integer().min(1)
const negativeInteger = joi.number().integer().max(-1)

const positiveNumber = joi.number().min(0)
const negativeNumber = joi.number().max(0)

const arrayString = joi.array().items(joi.string())
const arrayId = joi.array().items(id)
const arrayNumber = joi.array().items(joi.number())

module.exports = {
	page,
	limit,
	search,
	email,
	uri,
	id,
	phoneNumber,
	password,
	sortField,
	sortType,
	positiveInteger,
	negativeInteger,
	positiveNumber,
	negativeNumber,
	arrayId,
	arrayNumber,
	arrayString,
}
