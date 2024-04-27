const { InventoryService } = require("../services")

class InventoryController {
	createInventory = async (req, res) => {
		res.sendData(
			await InventoryService.createInventory({
				...req.body,
				shop: req.user._id,
			}),
		)
	}

	deleteInventory = async (req, res) => {
		res.sendData(await InventoryService.deleteInventory(req.params.id))
	}

	getInventory = async (req, res) => {
		res.sendData(
			await InventoryService.getInventory({
				...req.query,
				shop: req.user._id,
			}),
		)
	}

	updateInventory = async (req, res) => {
		res.sendData(
			await InventoryService.updateInventory({
				...req.body,
				...req.params,
			}),
		)
	}
}

module.exports = new InventoryController()
