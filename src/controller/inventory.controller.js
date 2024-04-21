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

	getInventory = async (req, res) => {
		res.sendData(
			await InventoryService.getInventory({
				...req.query,
				shop: req.user._id,
			}),
		)
	}

	deleteInventory = async (req, res) => {
		res.sendData(await InventoryService.deleteInventory(req.params.id))
	}
}

module.exports = new InventoryController()
