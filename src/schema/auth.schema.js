const joi = require("joi")

const signupSchema = joi.object({
	email: joi.string().email().required(),
	password: joi
		.string()
		.required()
		.regex(
			/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
			"strong password",
		),
	name: joi.string(),
	phone: joi.string(),
	avatar: joi.string()
})

const loginSchema = joi.object({
	email: joi.string().email().required(),
	password: joi
		.string()
		.required()
		.regex(
			/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
			"strong password",
		),
})

module.exports = {
	signupSchema,
	loginSchema,
}
