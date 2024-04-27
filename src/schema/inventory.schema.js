const joi = require("joi")
const {
	constant: { INVENTORY_STATUS },
} = require("../helper")
const { id, page, limit, sortField, sortType } = require("./common.schema")

const inventoryProductSkuId = joi.string().min(24)
const inventoryStock = joi.number().min(0).integer()
const inventoryPrice = joi.number().min(0)
const inventoryStatus = joi.string().valid(...INVENTORY_STATUS)
const inventoryLocation = joi.string()

const createInventorySchema = joi.object().keys({
	product_sku_id: inventoryProductSkuId.required(),
	stock: inventoryStock.required(),
	price: inventoryPrice.required(),
	location: inventoryLocation.required(),
})

const idInventorySchema = joi.object().keys({
	id: id.required(),
})

const getInventorySchema = joi.object().keys({
	product_sku_id: inventoryProductSkuId,
	stock: inventoryStock,
	price: inventoryPrice,
	status: inventoryStatus,
	page,
	limit,
	sort_field: sortField,
	sort_type: sortType,
})

const updateInventorySchema = joi.object().keys({
	stock: inventoryStock,
	price: inventoryPrice,
	location: inventoryLocation,
})

module.exports = {
	createInventorySchema,
	idInventorySchema,
	getInventorySchema,
	updateInventorySchema,
}
