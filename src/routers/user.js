"use strict"

const express = require("express")

const userController = require("../controller/user.controller")
const { asyncHandler } = require("../helper")

const onlyRoles = require("../middleware/role.middleware")
const passport = require("../services/passport.service")

const router = express.Router()

router.get(
	"/register",
	passport.authenticate("jwt", { session: false }),
	onlyRoles(["ADMIN"]),
	asyncHandler(userController.getAllRegisterShop),
)
router.post(
	"/register",
	passport.authenticate("jwt", { session: false }),
	onlyRoles(["USER"]),
	asyncHandler(userController.registerShop),
)
router.post(
	"/verify/:id",
	passport.authenticate("jwt", { session: false }),
	onlyRoles(["ADMIN"]),
	asyncHandler(userController.verifyShop),
)


module.exports = router
