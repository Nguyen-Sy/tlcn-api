"use strict"

const express = require("express")

const cartController = require("../controller/cart.controller")
const validator = require("../middleware/validate.middleware")
const { asyncHandler } = require("../helper")
const { cart } = require("../schema")

const onlyRoles = require("../middleware/role.middleware")
const { passport } = require("../lib")

const router = express.Router()

router.use(
	passport.authenticate("jwt", { session: false }),
	onlyRoles(["SHOP", "USER"]),
)

router.get("/", asyncHandler(cartController.getCart))
router.post(
	"/",
	validator({
		body: cart.updateCartSchema,
	}),
	asyncHandler(cartController.updateCart),
)

module.exports = router
