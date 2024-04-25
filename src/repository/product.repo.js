"use strict"

const BaseRepository = require("./base.repo")
const productSkuRepo = require("./productSku.repo")
const { product } = require("../models")
const { Types } = require("mongoose")

class ProductRepo extends BaseRepository {
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
		if (sku_list) {
			price = sku_list[0].price
			sku_list.forEach(({ is_default = false, price: skuPrice }) => {
				if (is_default) price = skuPrice
			})
		}

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

	findDetailProducts = async (
		ids,
		product_filter = { is_published: true, is_deleted: { $ne: true } },
		product_sku_filter = { is_published: true, is_deleted: { $ne: true } },
	) => {
		ids = ids.map((e) => new Types.ObjectId(e))
		const pipelines = [
			{
				$match: {
					_id: { $in: ids },
					...product_filter,
				},
			},
			{
				$lookup: {
					from: "productSkus",
					let: { productId: "$_id", shopId: "$shop" },
					pipeline: [
						{
							$addFields: {
								skuParts: {
									$split: ["$sku_id", "-"],
								},
							},
						},
						{
							$match: {
								$expr: {
									$and: [
										{
											$eq: [
												{
													$arrayElemAt: [
														"$skuParts",
														0,
													],
												},
												{ $toString: "$$productId" },
											],
										}, // Match product._id
										{
											$eq: [
												{
													$arrayElemAt: [
														"$skuParts",
														1,
													],
												},
												{ $toString: "$$shopId" },
											],
										}, // Match product.shop
									],
								},
								...product_sku_filter,
							},
						},
					],
					as: "skus",
				},
			},
			{
				$project: {
					"skus.skuParts": 0,
					"skus.is_deleted": 0,
					"skus.is_default": 0,
					"skus.is_published": 0,
					"skus.priority_sort": 0,
					"skus.__v": 0,
					is_deleted: 0,
					is_published: 0,
					priority_sort: 0,
					__v: 0,
				},
			},
		]
		return await this.model.aggregate(pipelines)
	}
}

module.exports = new ProductRepo()
