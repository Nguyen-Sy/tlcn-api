"use strict"

const CategoryService = require("./category.service")
const { BadRequestError } = require("../core/error.response")
const { productRepository } = require("../repository")

class ProductService {
	static createProduct = async ({
		name,
		description,
		images,
		category,
		shop,
		attributes,
		variations,
		price,
	}) => {
		const productCate = await CategoryService.getCategoryById(category)
		if (!productCate) throw new BadRequestError("Invalid category")

		return await productRepository.createProduct({
			name,
			description,
			images,
			category,
			shop,
			attributes,
			variations,
			price,
		})
	}

	static updateProduct = async ({
		name,
		description,
		images,
		category,
		shop,
		attributes,
		variations,
		price,
	}) => {
		const productCate = await CategoryService.getCategoryById(category)
		if (!productCate) throw new BadRequestError("Invalid category")

		return await productRepository.updateProduct({
			name,
			description,
			images,
			category,
			shop,
			attributes,
			variations,
			price,
		})
	}

	static publishProduct = async (productId) => {
		return await productRepository.publicProduct(productId)
	}

	static unpublishProduct = async (productId) => {
		return await productRepository.unpublishProduct(productId)
	}

	static findProduct = async ({
		search,
		category,
		price,
		sort,
		sortType,
		page = 1,
		limit = 20,
	}) => {
		let pipelines = []
		let matchPipeline = {}
		let sortPipeline = { createdAt: -1 }
		console.log(search, category, price, sort, sortType)
		if (category) {
			const productCate = await CategoryService.getCategoryById(category)
			if (!productCate) throw new BadRequestError("Invalid category id")
			pipelines = pipelines.concat([
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
						"category.left": { $gte: productCate.left },
						"category.right": { $lte: productCate.right },
						"category.rootId": productCate.rootId,
					},
				},
			])
		}
		if (search) {
			matchPipeline = {
				...matchPipeline,
				$text: { $search: search },
			}
		}
		if (price) {
			const priceRange = price.split(",").map((e) => e.trim())
			const priceFilter = {}
			if (priceRange[0] !== "") priceFilter.$gte = Number(priceRange[0])
			if (priceRange[1] !== "") priceFilter.$lte = Number(priceRange[1])
			matchPipeline = {
				...matchPipeline,
				price: priceFilter,
			}
		}
		if (sort) {
			sortPipeline = {
				[sort]: sortType == "asc" ? 1 : -1,
			}
		}
		pipelines.unshift({ $match: matchPipeline })
		pipelines.push({ $sort: sortPipeline })
		pipelines.concat([{ $skip: (page - 1) * limit }, { $limit: limit }])
		return await productRepository.model.aggregate(pipelines)
	}
}

module.exports = ProductService
