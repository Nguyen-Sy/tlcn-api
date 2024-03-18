"use strict"

const BaseRepository = require("./base.repo")
const { categoryModel } = require("../models")

class CategoryRepository extends BaseRepository {
	constructor() {
		super(categoryModel, "category")
	}

	createCategory = async ({
		name,
		description,
		image,
		right,
		left,
		parentId,
		rootId,
	}) => {
		return await this.create({
			name,
			description,
			image,
			right,
			left,
			parentId,
			rootId,
		})
	}

	updateCategory = async ({ id, name, description, image }) => {
		return await this.findOneAndUpdate(
			{ _id: id },
			{ name, description, image },
		)
	}
}

module.exports = new CategoryRepository()
