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
		})
	}

	static publishProduct = async (productId) => {
		return await productRepository.publicProduct(productId)
	}

	static unpublishProduct = async (productId) => {
		return await productRepository.unpublishProduct(productId)
	}

	static findProduct = async (query) => {
		return await productRepository.findProduct(query)
	}
}

module.exports = ProductService
