const joi = require("joi")
const { email } = require("./common.schema")

const otpType = joi.string().valid("verify", "forgot")

const verifySchema = joi.object({
	type: otpType.required(),
	email: email.required(),
	token: joi.number().required().min(100000).max(999999),
})

const sendOtpSchema = joi.object({
	type: otpType.required(),
	email: email.required(),
})

module.exports = {
	verifySchema,
	sendOtpSchema,
}
