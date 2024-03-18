const { userRepository, shopRegisterRepository } = require("../repository")
const UserLoginService = require("./userLogin.service")
const { BadRequestError } = require("../core/error.response")

class UserService {
	static createUser = async ({ email, phone, avatar, name }) => {
		return await userRepository.createUser({ email, phone, avatar, name })
	}

	static getAllRegister = async () => {
		return await shopRegisterRepository.getAllShopRegister()
	}

	static shopRegister = async (userLogin) => {
		const user = await userRepository.findByEmail(userLogin.local.email)
		if (!user) throw new BadRequestError("User not found")

		const requiredFields = ["name", "phone", "email", "addresses"]
		const missingField = []
		requiredFields.forEach((field) => {
			if (!user[field]) missingField.push(field)
		})
		if (missingField.length != 0)
			throw new BadRequestError(
				`Please update missing info ${missingField}`,
			)

		return await shopRegisterRepository.createShopRegister(
			userLogin.local.email,
		)
	}

	static verifyRegister = async (id) => {
		const verifiedRegister =
			await shopRegisterRepository.verifyShopRegister(id)
		await UserLoginService.updateShopRole(verifiedRegister.email)
		return verifiedRegister
	}
}

module.exports = UserService
