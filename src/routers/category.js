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
		query: category.getChildCategory,
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
		body: category.createCategory,
	}),
	asyncHandler(categoryController.createCategory),
)
router.put(
	"/:id",
	validator({
		body: category.updateCategory,
	}),
	asyncHandler(categoryController.updateCategory),
)
router.delete("/:id", asyncHandler(categoryController.deleteCategory))

module.exports = router
