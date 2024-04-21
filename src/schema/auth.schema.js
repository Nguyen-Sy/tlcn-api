const joi = require("joi")
const { email, password, phoneNumber } = require("./common.schema")

const signupSchema = joi.object().keys({
	name: joi.string().min(5),
	phone: phoneNumber,
	avatar: joi.string(),
	email: email.required(),
	password: password.required(),
})

const loginSchema = joi.object({
	email: email.required(),
	password: password.required(),
})

module.exports = {
	signupSchema,
	loginSchema,
}
