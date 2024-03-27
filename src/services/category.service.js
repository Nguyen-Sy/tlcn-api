const { BadRequestError } = require("../core/error.response")
const { categoryRepository } = require("../repository")
const { v4: uuidv4 } = require("uuid")

class CategoryService {
	static createCategory = async ({
		name,
		description,
		image,
		parentId = null,
	}) => {
		let right
		let rootId = uuidv4()
		if (parentId) {
			const parentCategory = await categoryRepository.findById(parentId)
			if (!parentCategory) throw new BadRequestError("Not found category")
			await categoryRepository.updateMany(
				{
					right: { $gte: parentCategory.right },
				},
				{
					$inc: { right: 2 },
				},
			)
			await categoryRepository.updateMany(
				{
					left: { $gt: parentCategory.right },
				},
				{
					$inc: { left: 2 },
				},
			)
			right = parentCategory.right
			rootId = parentCategory.rootId
		} else {
			const maxRight = await categoryRepository.findById(
				parentId,
				false,
				{
					select: ["right"],
					sort: "-right",
				},
			)
			right = maxRight ? maxRight + 1 : 1
		}
		return await categoryRepository.createCategory({
			name,
			description,
			image,
			left: right,
			right: right + 1,
			parentId,
			rootId,
		})
	}

	static getChildCategory = async (parentId = null) => {
		let query
		if (parentId) {
			const parentCate = await categoryRepository.findById(parentId)
			if (!parentCate) throw new BadRequestError("Invalid category id")
			query = {
				left: { $gt: parentCate.left },
				right: { $lte: parentCate.right },
				rootId: parentCate.rootId,
			}
		} else {
			query = { parentId: null }
		}
		return await categoryRepository.find(query, false, {
			unselect: ["left", "right", "rootId"],
			sort: "left",
		})
	}

	static getCategoryById = async (id) => {
		return await categoryRepository.findById(id)
	}

	static updateCategory = async ({ id, name, description, image }) => {
		return await categoryRepository.updateCategory({
			id,
			name,
			description,
			image,
		})
	}

	static deleteCategory = async (id) => {
		const foundCategory = await categoryRepository.findById(id, true)
		if (!foundCategory) throw new BadRequestError("Invalid category id")

		const width = foundCategory.right - foundCategory.left + 1
		await categoryRepository.deleteMany({
			rootId: foundCategory.rootId,
			left: { $gte: foundCategory.left },
			right: { $lte: foundCategory.right },
		})

		await categoryRepository.updateMany(
			{
				right: { $gt: foundCategory.right },
			},
			{ $inc: { right: -width } },
		)
		await categoryRepository.updateMany(
			{
				left: { $gt: foundCategory.right },
			},
			{ $inc: { left: -width } },
		)
	}
}

module.exports = CategoryService
