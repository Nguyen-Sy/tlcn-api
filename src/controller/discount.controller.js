const { DiscountService } = require("../services")

class DiscountController {
	createDiscount = async (req, res) => {
		res.sendData(
			await DiscountService.createDiscount({
				...req.body,
				creator: req.user._id,
			}),
		)
	}

	deleteDiscount = async (req, res) => {
		res.sendData(
			await DiscountService.deleteDiscount({
				code: req.params.code,
				creator: req.user._id,
			}),
		)
	}

	getDiscount = async (req, res) => {
		res.sendData(await DiscountService.createDiscount(req.query))
	}

	updateDiscount = async (req, res) => {
		res.sendData(
			await DiscountService.updateDiscount({
				...req.body,
				creator: req.user._id,
			}),
		)
	}
}

module.exports = new DiscountController()
