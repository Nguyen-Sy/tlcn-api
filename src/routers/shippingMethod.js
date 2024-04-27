"use strict"

const express = require("express")
const onlyRoles = require("../middleware/role.middleware")
const shippingMethodController = require("../controller/shippingMethod.controller")
const validator = require("../middleware/validate.middleware")
const { asyncHandler } = require("../helper")
const { passport } = require("../lib")
const { shippingMethod } = require("../schema")

const router = express.Router()

router.use(passport.authenticate("jwt", { session: false }))
router.use(onlyRoles(["ADMIN"]))

router.get("/", asyncHandler(shippingMethodController.getShippingMethod))
router.post(
	"/",
	validator({
		body: shippingMethod.createShippingMethodSchema,
	}),
	asyncHandler(shippingMethodController.createShippingMethod),
)
router.put(
	"/:id",
	validator({
		params: shippingMethod.shippingMethodIdSchema,
		body: shippingMethod.updateShippingMethodSchema,
	}),
	asyncHandler(shippingMethodController.updateShippingMethod),
)
router.delete(
	"/:id",
	validator({
		params: shippingMethod.shippingMethodIdSchema,
	}),
	asyncHandler(shippingMethodController.deleteShippingMethod),
)

module.exports = router
