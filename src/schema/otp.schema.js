const joi = require("joi")
const {
	constant: { OTP_EXPIRE_TIMES },
} = require("../helper")
const { email } = require("./common.schema")

const otpType = joi.string().valid(...Object.keys(OTP_EXPIRE_TIMES))

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
