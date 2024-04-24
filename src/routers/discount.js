"use strict"

const express = require("express")

const discountController = require("../controller/discount.controller")
const validator = require("../middleware/validate.middleware")
const { asyncHandler } = require("../helper")
const { discount } = require("../schema")

const onlyRoles = require("../middleware/role.middleware")
const { passport } = require("../lib")

const router = express.Router()

router.get(
	"/",
	validator({
		query: discount.getDiscountSchema,
	}),
	asyncHandler(discountController.getDiscount),
)

router.use(
	passport.authenticate("jwt", { session: false }),
	onlyRoles(["ADMIN", "SHOP"]),
)
router.post(
	"/",
	validator({
		body: discount.createDiscountSchema,
	}),
	asyncHandler(discountController.createDiscount),
)
router.put(
	"/:id",
	validator({
		params: discount.discountIdSchema,
		body: discount.updateDiscountSchema,
	}),
	asyncHandler(discountController.updateDiscount),
)
router.delete(
	"/:id",
	validator({ params: discount.createDiscountSchema }),
	asyncHandler(discountController.deleteDiscount),
)

module.exports = router
