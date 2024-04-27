"use strict"

const BaseRepository = require("./base.repo")
const {
	object: { removeEmptyField },
} = require("../utils")
const { inventory } = require("../models")

class InventoryRepo extends BaseRepository {
	constructor() {
		super(inventory, "inventory")
	}

	createInventory = async ({
		product_sku_id,
		shop,
		stock,
		price,
		location,
	}) => {
		return await this.create({
			product_sku_id,
			shop,
			stock,
			price,
			location,
		})
	}

	findByShop = async (shop) => {
		return await this.findOne({ shop })
	}

	findByProduct = async (product_sku_id) => {
		return await this.findOne({ product_sku_id })
	}

	updateInventory = async ({ stock, price, id, location }) => {
		const updatedInventory = { stock, price, location }
		return await this.findOneAndUpdate(
			{ _id: id },
			removeEmptyField(updatedInventory),
		)
	}
}

module.exports = new InventoryRepo()
