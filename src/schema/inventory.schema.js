const joi = require("joi")
const { id, page, limit, sortField, sortType } = require("./common.schema")

const inventoryProductSkuId = joi.string().min(24)
const inventoryStock = joi.number().min(0).integer()
const inventoryPrice = joi.number().min(0)
const inventoryStatus = joi.string().valid("in_used", "out_of_stock", "pending")

const createInventorySchema = joi.object().keys({
	product_sku_id: inventoryProductSkuId.required(),
	stock: inventoryStock.required(),
	price: inventoryPrice.required(),
})

const deleteInventorySchema = joi.object().keys({
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

module.exports = {
	createInventorySchema,
	deleteInventorySchema,
	getInventorySchema,
}
