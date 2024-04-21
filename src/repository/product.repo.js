"use strict"

const BaseRepository = require("./base.repo")
const productSkuRepo = require("./productSku.repo")
const { product } = require("../models")

class productRepo extends BaseRepository {
	constructor() {
		super(product, "product")
	}

	createProduct = async ({
		name,
		description,
		images,
		category,
		attributes,
		shop,
		price,
		variations,
		sku_list,
	}) => {
		price = sku_list[0].price
		sku_list.forEach(({ is_default = false, price: skuPrice }) => {
			if (is_default) price = skuPrice
		})

		const product = await this.create({
			name,
			description,
			images,
			category,
			attributes,
			shop,
			price,
			variations,
		})

		sku_list = await Promise.all(
			sku_list.map(({ tier_idx, is_default = false, price }) => {
				return productSkuRepo.createProductSku({
					tier_idx,
					is_default,
					price,
					sku_id: `${product._id}-${shop}-${tier_idx.join(".")}`,
				})
			}),
		)
		return { ...product, sku_list }
	}

	updateProduct = async ({
		id,
		name,
		description,
		images,
		category,
		attributes,
		variations,
	}) => {
		return await this.findOneAndUpdate(
			{ _id: id },
			{ name, description, images, category, attributes, variations },
		)
	}

	publishProduct = async (id) => {
		return await this.findOneAndUpdate({ _id: id }, { is_published: true })
	}

	unpublishProduct = async (id) => {
		return await this.findOneAndUpdate({ _id: id }, { is_published: false })
	}

	deleteProduct = async (id) => {
		return await this.findOneAndSoftDelete({ _id: id })
	}

	findProductByShop = async (shopId, { page, limit, sort }) => {
		return await this.page(
			{
				shop: shopId,
			},
			{ page, limit, sort },
		)
	}

	findAllProducts = async ({ page = 1, limit = 20, sort = "ctime" }) => {
		return await this.page({ is_published: true }, { page, limit, sort })
	}

	findUnpublishProducts = async (shop, { page, limit, sort }) => {
		return await this.page(
			{
				shop,
				isPublish: false,
			},
			{ page, limit, sort },
		)
	}

	searchProduct = async (search) => {
		return await this.model
			.find(
				{
					$text: RegExp(search),
					is_published: true,
				},
				{ score: { $meta: "textScore" } },
			)
			.sort({ score: 1 })
			.lean()
	}
}

module.exports = new productRepo()
