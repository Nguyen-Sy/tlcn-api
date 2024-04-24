"use strict"

const UserLoginService = require("./userLogin.service")
const { BadRequestError } = require("../core/error.response")
const { userRepo, shopRegisterRepo } = require("../repository")

class UserService {
	static createUser = async ({ email, phone, avatar, name, id }) => {
		return await userRepo.createUser({ email, phone, avatar, name, id })
	}

	static getAllRegister = async ({ verified }) => {
		return await shopRegisterRepo.getAllShopRegister(verified)
	}

	static shopRegister = async (userLogin) => {
		const pipelines = [
			{
				// Match userLogin documents with the specified email
				$match: { email: userLogin.local.email },
			},
			{
				$lookup: {
					// Collection name of shopRegister
					from: "shopRegisters",
					localField: "email",
					foreignField: "email",
					// add a new field 'shopRegister' to the result
					as: "shopRegister",
				},
			},
			{
				$project: {
					// Exclude the _id field from the result
					_id: 0,
					// Keep the original userLogin document
					existedUserInfo: "$$ROOT",
					// Get the first matched shopRegister document
					existedRequestShop: { $arrayElemAt: ["$shopRegister", 0] },
				},
			},
		]

		const [{ existedUserInfo, existedRequestShop }] =
			await userRepo.model.aggregate(pipelines)
		if (!existedUserInfo) throw new BadRequestError("User not existed")
		if (existedRequestShop)
			throw new BadRequestError("Shop request is processing")

		const requiredFields = ["name", "phone", "email", "addresses"]
		const missingField = []
		requiredFields.forEach((field) => {
			if (!existedUserInfo[field]) missingField.push(field)
		})
		if (missingField.length != 0)
			throw new BadRequestError(
				`Please update missing info ${missingField}`,
			)

		return await shopRegisterRepo.createShopRegister(userLogin.local.email)
	}

	static verifyRegister = async (id) => {
		const verifiedRegister = await shopRegisterRepo.verifyShopRegister(id)
		await UserLoginService.updateShopRole(verifiedRegister.email)
		return verifiedRegister
	}
}

module.exports = UserService
