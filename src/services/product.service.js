"use strict"

const CategoryService = require("./category.service")
const { BadRequestError } = require("../core/error.response")
const { productRepo } = require("../repository")

class ProductService {
	static createProduct = async ({
		name,
		description,
		images,
		category,
		shop,
		attributes,
		variations,
		sku_list,
		price,
	}) => {
		const productCate = await CategoryService.getCategoryById(category)
		if (!productCate) throw new BadRequestError("Invalid category")

		const product = await productRepo.createProduct({
			name,
			description,
			images,
			category,
			shop,
			attributes,
			variations,
			price,
			sku_list,
		})

		return product
	}

	static updateProduct = async ({
		name,
		description,
		images,
		category,
		shop,
		attributes,
		price,
		variations,
	}) => {
		const productCate = await CategoryService.getCategoryById(category)
		if (!productCate) throw new BadRequestError("Invalid category")

		return await productRepo.updateProduct({
			name,
			description,
			images,
			category,
			shop,
			attributes,
			price,
			variations,
		})
	}

	static publishProduct = async (productId) => {
		return await productRepo.publicProduct(productId)
	}

	static unpublishProduct = async (productId) => {
		return await productRepo.unpublishProduct(productId)
	}

	static findProduct = async ({
		search,
		category,
		price,
		sortField,
		sortType,
		page = 1,
		limit = 20,
	}) => {
		let pipelines = []
		let matchPipeline = {}
		let sortPipeline = { createdAt: -1 }
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
						"category.root_id": productCate.root_id,
					},
				},
				{
					$project: {
						category: 0,
						createdAt: 0,
						updatedAt: 0,
						__v: 0,
						is_deleted: 0,
						priority_sort: 0,
					},
				},
			])
		}
		if (search) {
			matchPipeline = {
				...matchPipeline,
				$text: { $search: search },
			}
			sortPipeline.score = { $meta: "textScore" }
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
		if (sortField) {
			sortPipeline[sortField] = sortType == "asc" ? 1 : -1
		}
		pipelines.unshift({ $match: matchPipeline })
		pipelines.push({ $sort: sortPipeline })
		pipelines.concat([{ $skip: (page - 1) * limit }, { $limit: limit }])
		return await productRepo.model.aggregate(pipelines)
	}

	static getProductDetail = async (productId) => {
		const productDetails = await productRepo.findDetailProducts([productId])
		if (productDetails.length == 0)
			throw new BadRequestError("Product is not existed")
		return productDetails[0]
	}
}

module.exports = ProductService
