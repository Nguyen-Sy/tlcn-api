const joi = require("joi")
const { isValidObjectId } = require("mongoose")

const page = joi.number().min(1)
const limit = joi.number().min(20)
const search = joi.string()

const email = joi.string().email()
const password = joi
	.string()
	.regex(
		/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
		"strong password",
	)
const uri = joi.string().uri()
const id = joi.string().custom((value, helper) => {
	if (!isValidObjectId(value)) return helper.message("Not valid objectId")
})

module.exports = {
	page,
	limit,
	search,
	email,
	uri,
	id,
	password,
}
