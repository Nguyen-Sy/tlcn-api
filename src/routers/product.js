"use strict"

const express = require("express")
const onlyRole = require("../middleware/role.middleware")
const productController = require("../controller/product.controller")
const validator = require("../middleware/validate.middleware")
const { asyncHandler } = require("../helper")
const { PassportService: passport } = require("../services")
const { product } = require("../schema")
const router = express.Router()

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	validator({
		body: product.createProductSchema,
	}),
	onlyRole(["SHOP"]),
	asyncHandler(productController.createProduct),
)
router.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	validator({
		params: product.productIdSchema,
		body: product.updateProductSchema,
	}),
	onlyRole(["SHOP"]),
	asyncHandler(productController.updateProduct),
)
router.patch(
	"/publish/:id",
	passport.authenticate("jwt", { session: false }),
	validator({
		params: product.productIdSchema,
	}),
	onlyRole(["SHOP"]),
	asyncHandler(productController.publishProduct),
)
router.patch(
	"/unpublish/:id",
	passport.authenticate("jwt", { session: false }),
	validator({
		params: product.productIdSchema,
	}),
	onlyRole(["SHOP", "ADMIN"]),
	asyncHandler(productController.unpublishProduct),
)
router.get("/:category", asyncHandler(productController.findProductByCategory))
module.exports = router
