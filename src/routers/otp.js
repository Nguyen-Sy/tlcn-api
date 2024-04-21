"use strict"

const express = require("express")
const otpController = require("../controller/otp.controller")
const validator = require("../middleware/validate.middleware")
const { asyncHandler } = require("../helper")
const { otp } = require("../schema")
const router = express.Router()

router.post(
	"/",
	validator({
		body: otp.sendOtpSchema,
	}),
	asyncHandler(otpController.sendVerifyOtp),
)
router.post(
	"/verify",
	validator({
		body: otp.verifySchema,
	}),
	asyncHandler(otpController.verifyOtp),
)

module.exports = router
