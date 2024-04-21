"use strict"

const redisClient = require("../db/init.redis")
const userLoginService = require("./userLogin.service")
const {
	constant: { EXPIRE_TIMES },
} = require("../helper")
const {
	jwt: { genPairToken },
} = require("../lib")
const { BadRequestError } = require("../core/error.response")
const { nodemailer } = require("../lib")
const { otpRepo } = require("../repository")

class OtpService {
	static createOtp = async (email, expireTime) => {
		return await otpRepo.createOtp(email, expireTime)
	}

	static sendVerifyOtp = async ({ email, type }) => {
		const numberOfEmailSendKey = `sendVerifyOtp:${email}`
		const numberOfEmailSend = parseInt(
			await redisClient.get(numberOfEmailSendKey),
		)

		if (numberOfEmailSend >= 3) {
			throw new BadRequestError("Exceed send verify email times")
		} else {
			await redisClient.set(
				numberOfEmailSendKey,
				numberOfEmailSend ? numberOfEmailSend + 1 : 1,
				{
					EX: 60,
				},
			)
		}

		if (!Object.keys(EXPIRE_TIMES).includes(type))
			throw new BadRequestError("Invalid otp type")

		const userLogin = await userLoginService.findByEmail(email)
		if (!userLogin) throw new BadRequestError("Invalid email")

		const createOtp = await this.createOtp(email, EXPIRE_TIMES[type])
		await nodemailer[`send${type[0].toUpperCase() + type.slice(1)}Email`]({
			OTP: createOtp.token,
			email: userLogin.local.email,
		})
	}

	static verifyOtp = async ({ token, email, type }) => {
		if (!Object.keys(EXPIRE_TIMES).includes(type))
			throw new BadRequestError("Invalid otp type")

		const otp = await otpRepo.findOtpByEmail(email, type)
		if (!otp) throw new BadRequestError("Otp not found")
		if (otp.token != token) {
			if (otp.wrong_times + 1 < 3) {
				await otpRepo.updateWrongTimes(email)
			} else {
				await otpRepo.deleteByEmail({ email })
			}
			throw new BadRequestError(
				`Otp code is invalid, remaining try: ${2 - otp.wrong_times}`,
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
		otpRepo.deleteByEmail(email)
		return true
	}
}

module.exports = OtpService
