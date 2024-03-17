const joi = require("joi")

const verifySchema = joi.object({
	token: joi
		.string()
		.required()
		.custom((value, helpers) => {
			const decodedToken = Buffer.from(value, "base64").toString()
			if (decodedToken.split("|").length != 3) {
				helpers.message("Invalid verify token")
			}
		}),
})

const sendOtpSchema = joi.object({
	type: joi
		.string()
		.valid(...["verify", "forgot"])
		.required(),
	email: joi.string().email().required(),
})

module.exports = {
	verifySchema,
	sendOtpSchema,
}
