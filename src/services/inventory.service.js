"use strict"
const { BadRequestError, UnauthorizedError } = require("../core/error.response")
const { inventoryRepo } = require("../repository")

class InventoryService {
	static createInventory = async ({ product_sku_id, shop, stock, price }) => {
		return await inventoryRepo.createInventory({
			product_sku_id,
			shop,
			stock,
			price,
		})
	}

	static deleteInventory = async (id) => {
		const productInventory = await inventoryRepo.findById(id)
		if (!productInventory)
			throw new BadRequestError("Product inventory not existed")

		if (productInventory.status !== "pending")
			throw new BadRequestError("Can't delete used inventory")
		await inventoryRepo.findOneAndDelete({ _id: id })
		return true
	}

	static getInventory = async ({
		shop,
		page = 1,
		limit = 20,
		product_sku_id = undefined,
		status = undefined,
		price = undefined,
	}) => {
		const filter = {}
		if (product_sku_id) {
			if (!product_sku_id.includes(shop)) throw new UnauthorizedError()
			filter.product_sku_id = product_sku_id
		} else {
			filter.product_sku_id = {
				$regex: new RegExp(`^[a-f\\d]+-${shop}-.*`),
				$options: "i",
			}
		}
		if (status) filter.status = status
		if (price) {
			const priceRange = price.split(",").map((e) => e.trim())
			if (priceRange[0] !== "")
				filter["price"]["$gte"] = Number(priceRange[0])
			if (priceRange[1] !== "")
				filter["price"]["$lte"] = Number(priceRange[1])
		}
		const productSkuInventories = await inventoryRepo.find(filter)
		return {
			items: productSkuInventories.slice(
				(page - 1) * limit,
				page * limit,
			),
			page,
			limit,
			totalPage: Math.ceil(productSkuInventories.length / limit),
		}
	}
}

module.exports = InventoryService
