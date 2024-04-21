const { CategoryService } = require("../services")

class CategoryController {
	createCategory = async (req, res) => {
		res.sendData(await CategoryService.createCategory(req.body))
	}

	getCategory = async (req, res) => {
		res.sendData(
			await CategoryService.getChildCategory(req.query.parent_id),
		)
	}

	updateCategory = async (req, res) => {
		res.sendData(
			await CategoryService.updateCategory({
				id: req.params.id,
				...req.body,
			}),
		)
	}

	deleteCategory = async (req, res) => {
		res.sendData(await CategoryService.deleteCategory(req.params.id))
	}
}

module.exports = new CategoryController()
