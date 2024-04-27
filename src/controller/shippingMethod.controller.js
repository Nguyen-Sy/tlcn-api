const { ShippingMethodService } = require("../services")

class ShippingMethodController {
	createShippingMethod = async (req, res) => {
		res.sendData(
			await ShippingMethodService.createShippingMethod(req.body),
			"Created",
			"Shipping method created",
		)
	}

	deleteShippingMethod = async (req, res) => {
		res.sendData(
			await ShippingMethodService.deleteShippingMethod(req.params.id),
		)
	}

	getShippingMethod = async (req, res) => {
		res.sendData(await ShippingMethodService.getShippingMethod())
	}

	updateShippingMethod = async (req, res) => {
		res.sendData(
			await ShippingMethodService.updateShippingMethod({
				...req.body,
				...req.params,
			}),
		)
	}
}

module.exports = new ShippingMethodController()
