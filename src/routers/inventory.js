"use strict"

const express = require("express")

const inventoryController = require("../controller/inventory.controller")
const validator = require("../middleware/validate.middleware")
const { asyncHandler } = require("../helper")
const { inventory } = require("../schema")

const onlyRoles = require("../middleware/role.middleware")
const { passport } = require("../lib")

const router = express.Router()

router.use(passport.authenticate("jwt", { session: false }))
router.use(onlyRoles(["SHOP"]))

router.get(
	"/",
	validator({
		query: inventory.getInventorySchema,
	}),
	asyncHandler(inventoryController.getInventory),
)

router.post(
	"/",
	validator({
		body: inventory.createInventorySchema,
	}),
	asyncHandler(inventoryController.createInventory),
)

router.delete(
	"/:id",
	validator({
		params: inventory.deleteInventorySchema,
	}),
	asyncHandler(inventoryController.deleteInventory),
)

module.exports = router
