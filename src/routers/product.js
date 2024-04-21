"use strict"

const express = require("express")
const onlyRole = require("../middleware/role.middleware")
const productController = require("../controller/product.controller")
const validator = require("../middleware/validate.middleware")
const { asyncHandler } = require("../helper")
const { passport } = require("../lib")
const { product } = require("../schema")
const router = express.Router()

router.get("/:category", asyncHandler(productController.findProductByCategory))
router.get(
	"/",
	validator({
		query: product.productQuerySchema,
	}),
	asyncHandler(productController.findProduct),
)

router.use(passport.authenticate("jwt", { session: false }))
router.post(
	"/",
	validator({
		body: product.createProductSchema,
	}),
	onlyRole(["SHOP"]),
	asyncHandler(productController.createProduct),
)
router.put(
	"/:id",
	validator({
		params: product.productIdSchema,
		body: product.updateProductSchema,
	}),
	onlyRole(["SHOP"]),
	asyncHandler(productController.updateProduct),
)
router.patch(
	"/publish/:id",
	validator({
		params: product.productIdSchema,
	}),
	onlyRole(["SHOP"]),
	asyncHandler(productController.publishProduct),
)
router.patch(
	"/unpublish/:id",
	validator({
		params: product.productIdSchema,
	}),
	onlyRole(["SHOP", "ADMIN"]),
	asyncHandler(productController.unpublishProduct),
)

module.exports = router
