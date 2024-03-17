"use strict"

const express = require("express")
const authController = require("../controller/auth.controller")
const { asyncHandler } = require("../helper")
const validator = require("../middleware/validate.middleware")
const { verifyRefreshToken } = require("../middleware/jwt.middleware")
const { auth } = require("../schema")
const router = express.Router()
const passport = require("../services/passport.service")

router.post(
	"/signup",
	validator({
		body: auth.signupSchema,
	}),
	asyncHandler(authController.signUp),
)
router.post(
	"/login",
	validator({
		body: auth.loginSchema,
	}),
	asyncHandler(authController.loginLocal),
)
router.get(
	"/facebook",
	passport.authenticate("facebook", { session: false }),
	asyncHandler(authController.loginFacebook),
)
router.get(
	"/facebook/callback",
	passport.authenticate("facebook", { session: false }),
	asyncHandler(authController.loginFacebookCallback),
)
router.get(
	"/google",
	passport.authenticate("google", { session: false }),
	asyncHandler(authController.loginGoogle),
)
router.get(
	"/google/callback",
	passport.authenticate("google", { session: false }),
	asyncHandler(authController.loginGoogleCallback),
)
router.get(
	"/logout",
	passport.authenticate("jwt", { session: false }),
	asyncHandler(authController.logout),
)
router.get(
	"/refresh",
	verifyRefreshToken,
	asyncHandler(authController.handleRefreshToken),
)

module.exports = router
