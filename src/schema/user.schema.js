const joi = require("joi")
const { phoneNumber, id } = require("./common.schema")

const userName = joi.string().min(4)
const userPhoneNumber = phoneNumber
const userAddresses = joi.array().items(joi.object())

const getAllRegisterShopSchema = joi.object({
	verified: joi.boolean(),
})

const verifyRegisterShopSchema = joi.object({
	id: id.required(),
})

const updateUserSchema = joi.object({
	name: userName,
	phoneNumber: userPhoneNumber,
	addresses: userAddresses,
})

module.exports = {
	getAllRegisterShopSchema,
	verifyRegisterShopSchema,
	updateUserSchema,
}
