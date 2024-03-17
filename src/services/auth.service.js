const bcrypt = require("bcrypt")

const { BadRequestError } = require("../core/error.response")
const NodeMailerService = require("./nodemailer.service")
const OtpService = require("./otp.service")
const { userLoginRepository } = require("../repository")
const { genPairToken } = require("../utils")
const { verifyFacebookToken, verifyGoogleToken } = require("../helper")

const DAY_IN_SEC = 3600 * 24

class AuthService {
	static signUp = async ({ email, password }) => {
		const foundUserLogin = await userLoginRepository.findByEmail(email)
		if (foundUserLogin)
			throw new BadRequestError("User's already registered")
		const createdUserLogin = await userLoginRepository.createLocalAccount({
			email,
			password: bcrypt.hashSync(password, 10),
		})
		OtpService.createOtp(email, DAY_IN_SEC).then((createOtp) => {
			NodeMailerService.sendVerifyEmail({
				OTP: createOtp.token,
				receiver: createdUserLogin,
			})
		})
		return true
	}

	static loginLocal = async ({ email, password }) => {
		const foundUserLogin = await userLoginRepository.findByEmail(email)
		if (!foundUserLogin)
			throw new BadRequestError("User's email/password is incorrect")

		if (!foundUserLogin.verified)
			throw new BadRequestError("User's account has not been verified")

		if (!bcrypt.compareSync(password, foundUserLogin.password))
			throw new BadRequestError("User's email/password is incorrect")

		const tokenPair = genPairToken({
			id: foundUserLogin._id,
			email,
		})

		userLoginRepository.updateRefreshToken({
			email,
			refreshToken: tokenPair.refreshToken,
		})
		return tokenPair
	}

	static loginFacebook = async ({
		refreshToken,
		accessToken,
		profile: { email, name, avatar, id },
	}) => {
		const foundUserLogin = await userLoginRepository.findByEmail(email)
		if (!foundUserLogin) {
			await userLoginRepository.createFacebookAccount({
				email,
				id,
				avatar,
				name,
				refreshToken,
			})
		}
		const updatedUserLogin = await userLoginRepository.updateLoginToken({
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
		const foundUserLogin = await userLoginRepository.findByEmail(email)
		if (!foundUserLogin) {
			await userLoginRepository.createGoogleAccount({
				email,
				id,
				avatar,
				name,
				refreshToken,
			})
		}
		const updatedUserLogin = await userLoginRepository.updateLoginToken({
			email,
			token: accessToken,
		})
		return updatedUserLogin.token
	}

	static loginSocialSuccess = async ({ loginType, token }) => {
		const foundUserLogin = await userLoginRepository.findByToken(token)
		if (!foundUserLogin) throw new BadRequestError("Invalid login token")
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
			id: foundUserLogin._id,
			email: foundUserLogin.email,
		})
		return tokenPair
	}

	static logout = async (email) => {
		await userLoginRepository.deleteRefreshToken(email)
		return true
	}

	static handleRefreshToken = async ({ userLogin, refreshToken }) => {
		if (userLogin.refreshToken != refreshToken)
			throw new BadRequestError("Invalid refresh token")
		if (userLogin.refreshTokenUsed.includes(refreshToken)) {
			await userLoginRepository.deleteRefreshToken(userLogin.email)
			throw new BadRequestError("Refresh token's already used")
		}
		await userLoginRepository.updateRefreshToken({
			email: userLogin.email,
			refreshToken,
		})
		return genPairToken({
			id: userLogin._id,
			email: userLogin.email,
		})
	}
}

module.exports = AuthService
