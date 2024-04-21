const { OtpService } = require("../services/index")

class OtpController {
	sendVerifyOtp = async (req, res) => {
		await OtpService.sendVerifyOtp(req.body)
		res.sendData(true)
	}

	verifyOtp = async (req, res) => {
		res.sendData(await OtpService.verifyOtp(req.body))
	}
}

module.exports = new OtpController()
