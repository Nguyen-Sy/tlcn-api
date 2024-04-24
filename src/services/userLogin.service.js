"use strict"

const bcrypt = require("bcrypt")
const {
	constant: { USER_ROLES },
} = require("../helper")
const { userLoginRepo } = require("../repository")

class UserLoginService {
	static findByEmail = async (email) => {
		return await userLoginRepo.findByEmail(email)
	}

	static updateVerify = async (email) => {
		return await userLoginRepo.updateVerify(email)
	}

	static updateForgotPassword = async (email) => {
		const password = Math.random().toString(36).slice(-8)
		await userLoginRepo.updatePassword({
			email,
			password: bcrypt.hashSync(password, 10),
		})
		return password
	}

	static updateShopRole = async (email) => {
		return await userLoginRepo.updateUserRole({
			email,
			role: USER_ROLES.SHOP,
		})
	}
}

module.exports = UserLoginService
