const { CartService } = require("../services")

class CartController {
	getCart = async (req, res) => {
		res.sendData(await CartService.getCart(req.user._id))
	}

	updateCart = async (req, res) => {
		res.sendData(
			await CartService.updateCart({
				user_id: req.user._id,
				...req.body,
			}),
		)
	}
}

module.exports = new CartController()
