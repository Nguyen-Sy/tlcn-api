"use strict"

const BaseRepository = require("./base.repo")
const {
	constant: { OTP_EXPIRE_TIMES },
} = require("../helper")
const { otp } = require("../models")

class OtpRepo extends BaseRepository {
	constructor() {
		super(otp, "otp")
	}

	createOtp = async (email, expireTime = 60) => {
		return await this.create({
			token: Math.floor(100000 + Math.random() * 900000),
			email,
			expired_at: new Date(Date.now() + expireTime * 1000),
		})
	}

	findOtpByEmail = async (email, type = "verify") => {
		return await this.findOne({
			email,
			createdAt: { $gte: Date.now() - OTP_EXPIRE_TIMES[type] * 1000 },
		})
	}

	updateWrongTimes = async (email) => {
		return await this.findOneAndUpdate(
			{ email },
			{ $inc: { wrong_times: 1 } },
		)
	}

	deleteByEmail = async (email) => {
		return await this.findOneAndDelete({ email })
	}
}

module.exports = new OtpRepo()
