"use strict"

const UserLoginService = require("./userLogin.service")
const { BadRequestError } = require("../core/error.response")
const { userRepo, shopRegisterRepo } = require("../repository")

class UserService {
	static createUser = async ({ email, phone, avatar, name }) => {
		return await userRepo.createUser({ email, phone, avatar, name })
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
					foundUserInfo: "$$ROOT",
					// Get the first matched shopRegister document
					foundRequestShop: { $arrayElemAt: ["$shopRegister", 0] },
				},
			},
		]

		const [{ foundUserInfo, foundRequestShop }] =
			await userRepo.model.aggregate(pipelines)
		if (!foundUserInfo) throw new BadRequestError("User not found")
		if (foundRequestShop)
			throw new BadRequestError("Shop request is processing")

		const requiredFields = ["name", "phone", "email", "addresses"]
		const missingField = []
		requiredFields.forEach((field) => {
			if (!foundUserInfo[field]) missingField.push(field)
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
