"use strict"

const BaseRepository = require("./base.repo")
const { inventory } = require("../models")

class InventoryRepo extends BaseRepository {
	constructor() {
		super(inventory, "inventory")
	}

	createInventory = async ({ product_sku_id, shop, stock, price }) => {
		return await this.create({
			product_sku_id,
			shop,
			stock,
			price,
		})
	}

	findByShop = async (shop) => {
		return await this.findOne({ shop })
	}

	findByProduct = async (product_sku_id) => {
		return await this.findOne({ product_sku_id })
	}

	updateInventory = async ({ product_sku_id, stock, price, id }) => {
		return await this.findOneAndUpdate(
			{ _id: id },
			{ product_sku_id, stock, price },
		)
	}
}

module.exports = new InventoryRepo()
