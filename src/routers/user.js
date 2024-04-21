"use strict"

const express = require("express")

const userController = require("../controller/user.controller")
const { asyncHandler } = require("../helper")

const onlyRoles = require("../middleware/role.middleware")
const validator = require("../middleware/validate.middleware")
const { passport } = require("../lib")
const { user } = require("../schema")

const router = express.Router()

router.use(passport.authenticate("jwt", { session: false }))

router.get(
	"/register",
	validator({
		query: user.getAllRegisterShopSchema,
	}),
	onlyRoles(["ADMIN"]),
	asyncHandler(userController.getAllRegisterShop),
)
router.post(
	"/register",
	onlyRoles(["USER"]),
	asyncHandler(userController.registerShop),
)
router.post(
	"/verify/:id",
	validator({
		params: user.verifyRegisterShopSchema,
	}),
	onlyRoles(["ADMIN"]),
	asyncHandler(userController.verifyShop),
)

module.exports = router
