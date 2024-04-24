"use strict"

const express = require("express")

const categoryController = require("../controller/category.controller")
const validator = require("../middleware/validate.middleware")
const { asyncHandler } = require("../helper")
const { category } = require("../schema")

const onlyRoles = require("../middleware/role.middleware")
const { passport } = require("../lib")

const router = express.Router()

router.get(
	"/",
	validator({
		query: category.getChildCategorySchema,
	}),
	asyncHandler(categoryController.getCategory),
)

router.use(
	passport.authenticate("jwt", { session: false }),
	onlyRoles(["ADMIN"]),
)
router.post(
	"/",
	validator({
		body: category.createCategorySchema,
	}),
	asyncHandler(categoryController.createCategory),
)
router.put(
	"/:id",
	validator({
		params: category.categoryIdSchema,
		body: category.updateCategorySchema,
	}),
	asyncHandler(categoryController.updateCategory),
)
router.delete(
	"/:id",
	validator({ params: category.categoryIdSchema }),
	asyncHandler(categoryController.deleteCategory),
)

module.exports = router
