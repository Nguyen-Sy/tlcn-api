"use strict"

const BaseRepository = require("./base.repo")
const { productModel } = require("../models")

class ProductRepository extends BaseRepository {
	constructor() {
		super(productModel, "product")
	}

	createProduct = async ({
		name,
		description,
		images,
		category,
		attributes,
		variations,
		shop,
	}) => {
		return await this.create({
			name,
			description,
			images,
			category,
			attributes,
			variations,
			shop,
		})
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
		return await this.findOneAndUpdate({ _id: id }, { isPublished: true })
	}

	unpublishProduct = async (id) => {
		return await this.findOneAndUpdate({ _id: id }, { isPublished: false })
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

	findProductByCategory = async (category, sort) => {
		return await this.model.aggregate([
			{
				$lookup: {
					from: "categories",
					localField: "category",
					foreignField: "_id",
					as: "category",
				},
			},
			{ $unwind: "$category" },
			{
				$match: {
					"category.left": { $gte: category.left },
					"category.right": { $lte: category.right },
					"category.rootId": category.rootId,
				},
			},
			{ $sort: { [sort]: 1 } },
		])
	}

	findAllProducts = async ({ page = 1, limit = 20, sort = "ctime" }) => {
		return await this.page({ isPublished: true }, { page, limit, sort })
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
					isPublished: true,
				},
				{ score: { $meta: "textScore" } },
			)
			.sort({ score: 1 })
			.lean()
	}
}

module.exports = new ProductRepository()
