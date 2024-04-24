"use strict"

const bcrypt = require("bcrypt")

const OtpService = require("./otp.service")
const UserService = require("./user.service")
const {
	jwt: { genPairToken },
} = require("../lib")
const { BadRequestError } = require("../core/error.response")
const { nodemailer } = require("../lib")
const { userLoginRepo } = require("../repository")
const { verifyFacebookToken, verifyGoogleToken } = require("../helper")

const DAY_IN_SEC = 3600 * 24

class AuthService {
	static signUp = async ({ email, password, name, avatar, phone }) => {
		const existedUserLogin = await userLoginRepo.findByEmail(email)
		if (existedUserLogin)
			throw new BadRequestError("User's already registered")
		const createdUserLogin = await userLoginRepo.createLocalAccount({
			email,
			password: bcrypt.hashSync(password, 10),
		})
		OtpService.createOtp(email, DAY_IN_SEC).then((createOtp) => {
			nodemailer.sendVerifyEmail({
				OTP: createOtp.token,
				email: createdUserLogin.local.email,
			})
			UserService.createUser({
				email,
				phone,
				avatar,
				name,
				id: createdUserLogin._id,
			})
		})
		return true
	}

	static loginLocal = async ({ email, password }) => {
		const existedUserLogin = await userLoginRepo.findByEmail(email)
		if (!existedUserLogin)
			throw new BadRequestError("User's email/password is incorrect")

		if (!existedUserLogin.verified)
			throw new BadRequestError("User's account has not been verified")

		if (!bcrypt.compareSync(password, existedUserLogin.local.password))
			throw new BadRequestError("User's email/password is incorrect")

		const pairToken = genPairToken({
			id: existedUserLogin._id,
			email: existedUserLogin.email,
		})
		const updatedRefreshTokensUsed = [
			pairToken.refreshToken,
			...existedUserLogin.refresh_tokens_used,
		]
		if (existedUserLogin.refresh_tokens_used.length >= 15)
			updatedRefreshTokensUsed.pop()

		userLoginRepo.findOneAndUpdate(
			{
				_id: existedUserLogin._id,
			},
			{
				refresh_token: pairToken.refreshToken,
				refresh_tokens_used: updatedRefreshTokensUsed,
			},
		)

		return pairToken
	}

	static loginFacebook = async ({
		refreshToken,
		accessToken,
		profile: { email, name, avatar, id },
	}) => {
		const existedUserLogin = await userLoginRepo.findByEmail(email)
		if (!existedUserLogin) {
			await userLoginRepo.createFacebookAccount({
				email,
				id,
				avatar,
				name,
				refreshToken,
			})
		}
		const updatedUserLogin = await userLoginRepo.updateLoginToken({
			email,
			token: accessToken,
		})
		return updatedUserLogin.token
	}

	static loginGoogle = async ({
		refreshToken,
		accessToken,
		profile: { email, name, avatar, id },
	}) => {
		const existedUserLogin = await userLoginRepo.findByEmail(email)
		if (!existedUserLogin) {
			await userLoginRepo.createGoogleAccount({
				email,
				id,
				avatar,
				name,
				refreshToken,
			})
		}
		const updatedUserLogin = await userLoginRepo.updateLoginToken({
			email,
			token: accessToken,
		})
		return updatedUserLogin.token
	}

	static loginSocialSuccess = async ({ loginType, token }) => {
		const existedUserLogin = await userLoginRepo.findByToken(token)
		if (!existedUserLogin) throw new BadRequestError("Invalid login token")
		let verified = false
		switch (loginType) {
			case "facebook":
				verified = verifyFacebookToken(token)
				break
			case "google":
				verified = verifyGoogleToken(token)
				break
			default:
				break
		}
		if (!verified) throw new BadRequestError("Invalid login token")
		const tokenPair = genPairToken({
			id: existedUserLogin._id,
			email: existedUserLogin.email,
		})
		return tokenPair
	}

	static logout = async (email) => {
		await userLoginRepo.deleteRefreshToken(email)
		return true
	}

	static handleRefreshToken = async ({ userLogin, refreshToken }) => {
		if (userLogin.refresh_token != refreshToken)
			throw new BadRequestError("Invalid refresh token")
		if (userLogin.refresh_tokens_used.includes(refreshToken)) {
			await userLoginRepo.deleteRefreshToken(userLogin.email)
			throw new BadRequestError("Refresh token's already used")
		}
		const pairToken = genPairToken({
			id: userLogin._id,
			email: userLogin.email,
		})
		const updatedRefreshTokensUsed = [
			pairToken.refreshToken,
			...userLogin.refresh_tokens_used,
		]
		if (userLogin.refresh_tokens_used.length >= 15)
			updatedRefreshTokensUsed.pop()

		userLoginRepo.findOneAndUpdate(
			{
				_id: userLogin._id,
			},
			{
				refresh_token: pairToken.refreshToken,
				refresh_tokens_used: updatedRefreshTokensUsed,
			},
		)

		return pairToken
	}
}

module.exports = AuthService
