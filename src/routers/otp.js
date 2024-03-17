"use strict"

const express = require("express")
const otpController = require("../controller/otp.controller")
const { asyncHandler } = require("../helper")
const validator = require("../middleware/validate.middleware")
const { otp } = require("../schema")
const router = express.Router()

router.post(
	"/",
	validator({
		body: otp.sendOtpSchema,
	}),
	asyncHandler(otpController.sendVerifyOtp),
)
router.get(
	"/:token",
	validator({
		params: otp.verifySchema,
	}),
	asyncHandler(otpController.verifyOtp),
)

module.exports = router
