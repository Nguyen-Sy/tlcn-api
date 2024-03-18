const nodemailerService = require("./nodemailer.service")
const userLoginService = require("./userLogin.service")
const { BadRequestError } = require("../core/error.response")
const { genPairToken } = require("../utils")
const { otpRepository } = require("../repository")

const EXPIRE_TIMES = {
	verify: 3600 * 24, // 24h
	forgot: 3600, // 1h
}
class OtpService {
	static createOtp = async (email, expireTime) => {
		return await otpRepository.createOtp(email, expireTime)
	}

	static sendVerifyOtp = async ({ email, type }) => {
		if (!Object.keys(EXPIRE_TIMES).includes(type))
			throw new BadRequestError("Invalid otp type")
		const userLogin = await userLoginService.findByEmail(email)
		if (!userLogin) throw new BadRequestError("Invalid email")

		const createOtp = await this.createOtp(email, EXPIRE_TIMES[type])
		await nodemailerService[
			`send${type[0].toUpperCase() + type.slice(1)}Email`
		]({
			OTP: createOtp.token,
			email: userLogin.local.email,
		})
	}

	static verifyOtp = async (_token) => {
		const [token, email, type] = Buffer.from(_token, "base64")
			.toString()
			.split("|")
		if (!Object.keys(EXPIRE_TIMES).includes(type))
			throw new BadRequestError("Invalid otp type")

		const otp = await otpRepository.findOtpByEmail(email)
		if (!otp) throw new BadRequestError("Otp not found")
		if (otp.token != token) {
			if (otp.wrongTimes + 1 < 3) {
				await otpRepository.updateWrongTimes(email)
			} else {
				await otpRepository.deleteByEmail({ email })
			}
			throw new BadRequestError(
				`Otp code is invalid, remaining try: ${2 - otp.wrongTimes}`,
			)
		}

		if (type == "verify") {
			await userLoginService.updateVerify(email)
		} else {
			const userLogin = await userLoginService.findByEmail(email)
			const tokenPair = genPairToken({
				id: userLogin._id,
				email,
			})
			return tokenPair
		}
		otpRepository.deleteByEmail(email)
		return true
	}
}

module.exports = OtpService
