const { cartRepo } = require("../repository")

class CartService {
	static createCart = async (user_id) => {
		return await cartRepo.createCart(user_id)
	}

	static deleteCart = async (user_id) => {
		return await cartRepo.findOneAndUpdate(
			{ _id: user_id },
			{ product_list: [] },
		)
	}

	static getCart = async (user_id) => {
		return await cartRepo.findById(user_id)
	}

	static updateCart = async ({ user_id, product_list }) => {
		return await cartRepo.updateCart({ user_id, product_list })
	}
}

module.exports = CartService
