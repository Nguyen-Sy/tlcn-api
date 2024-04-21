const { BadRequestError } = require("../core/error.response")
const { categoryRepo } = require("../repository")
const { v4: uuidv4 } = require("uuid")

class CategoryService {
	static createCategory = async ({
		name,
		description,
		image,
		parent_id = null,
	}) => {
		let right
		let root_id = uuidv4()
		if (parent_id) {
			const parentCategory = await categoryRepo.findById(parent_id)
			if (!parentCategory) throw new BadRequestError("Not found category")
			await categoryRepo.updateMany(
				{
					right: { $gte: parentCategory.right },
				},
				{
					$inc: { right: 2 },
				},
			)
			await categoryRepo.updateMany(
				{
					left: { $gt: parentCategory.right },
				},
				{
					$inc: { left: 2 },
				},
			)
			right = parentCategory.right
			root_id = parentCategory.root_id
		} else {
			const maxRight = await categoryRepo.findById(parent_id, false, {
				select: ["right"],
				sort: "-right",
			})
			right = maxRight ? maxRight + 1 : 1
		}
		return await categoryRepo.createCategory({
			name,
			description,
			image,
			left: right,
			right: right + 1,
			parent_id,
			root_id,
		})
	}

	static getChildCategory = async (parent_id = null) => {
		let query
		if (parent_id) {
			const parentCate = await categoryRepo.findById(parent_id)
			if (!parentCate) throw new BadRequestError("Invalid category id")
			query = {
				left: { $gt: parentCate.left },
				right: { $lte: parentCate.right },
				root_id: parentCate.root_id,
			}
		} else {
			query = { parent_id: null }
		}
		return await categoryRepo.find(query, false, {
			unselect: ["left", "right", "root_id"],
			sort: "left",
		})
	}

	static getCategoryById = async (id) => {
		return await categoryRepo.findById(id)
	}

	static updateCategory = async ({ id, name, description, image }) => {
		return await categoryRepo.updateCategory({
			id,
			name,
			description,
			image,
		})
	}

	static deleteCategory = async (id) => {
		const foundCategory = await categoryRepo.findById(id, true)
		if (!foundCategory) throw new BadRequestError("Invalid category id")

		const width = foundCategory.right - foundCategory.left + 1
		await categoryRepo.deleteMany({
			root_id: foundCategory.root_id,
			left: { $gte: foundCategory.left },
			right: { $lte: foundCategory.right },
		})

		await categoryRepo.updateMany(
			{
				right: { $gt: foundCategory.right },
			},
			{ $inc: { right: -width } },
		)
		await categoryRepo.updateMany(
			{
				left: { $gt: foundCategory.right },
			},
			{ $inc: { left: -width } },
		)
	}
}

module.exports = CategoryService
