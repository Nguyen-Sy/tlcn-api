"use strict"

const bcrypt = require("bcrypt")
const {
	constant: { ROLES },
} = require("../helper")
const { userLoginRepository } = require("../repository")

class UserLoginService {
	static findByEmail = async (email) => {
		return await userLoginRepository.findByEmail(email)
	}

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

	static updateShopRole = async (email) => {
		return await userLoginRepository.updateUserRole({
			email,
			role: ROLES.SHOP,
		})
	}
}

module.exports = UserLoginService
