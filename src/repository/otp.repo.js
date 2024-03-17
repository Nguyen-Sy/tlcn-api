const BaseRepository = require("./base.repo")
const { otpModel } = require("../models")

class OtpRepository extends BaseRepository {
	constructor() {
		super(otpModel, "otp")
	}

	createOtp = async (email, expireTime = 60) => {
		return await this.create({
			token: Math.floor(100000 + Math.random() * 900000),
			email,
			expiredAt: expireTime,
		})
	}

	findOtpByEmail = async (email) => {
		return await this.findOne({ email })
	}

	updateWrongTimes = async (email) => {
		return await this.findOneAndUpdate(
			{ email },
			{ $inc: { wrongTimes: 1 } },
		)
	}

	deleteByEmail = async (email) => {
		return await this.findOneAndDelete({ email })
	}
}

module.exports = new OtpRepository()
