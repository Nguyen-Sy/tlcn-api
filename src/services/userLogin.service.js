const { userLoginRepository } = require("../repository")
const bcrypt = require("bcrypt")

class UserLoginService {
	static updateVerify = async (email) => {
		return await userLoginRepository.updateVerify(email)
	}

	static updateForgotPassword = async (email) => {
		const password = Math.random().toString(36).slice(-8)
		await userLoginRepository.updatePassword({
			email,
			password: bcrypt.hashSync(password, 10),
		})
		return password
	}

	static findByEmail = async (email) => {
		return await userLoginRepository.findByEmail(email)
	}
}

module.exports = UserLoginService
