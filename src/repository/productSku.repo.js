"use strict"

const BaseRepository = require("./base.repo")
const { productSku } = require("../models")

class ProductSkuRepo extends BaseRepository {
	constructor() {
		super(productSku, "productSku")
	}

	createProductSku = async ({
		name,
		sku_id,
		tier_idx,
		is_default,
		price,
	}) => {
		return await this.create({
			sku_id,
			tier_idx,
			is_default,
			price,
			name,
		})
	}
}

module.exports = new ProductSkuRepo()
