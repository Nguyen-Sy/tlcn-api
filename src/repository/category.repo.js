"use strict"

const BaseRepository = require("./base.repo")
const { category } = require("../models")

class categoryRepo extends BaseRepository {
	constructor() {
		super(category, "category")
	}

	createCategory = async ({
		name,
		description,
		image,
		right,
		left,
		parent_id,
		root_id,
	}) => {
		return await this.create({
			name,
			description,
			image,
			right,
			left,
			parent_id,
			root_id,
		})
	}

	updateCategory = async ({ id, name, description, image }) => {
		return await this.findOneAndUpdate(
			{ _id: id },
			{ name, description, image },
		)
	}
}

module.exports = new categoryRepo()
