"use strict"

const BaseRepository = require("./base.repo")
const { cart } = require("../models")

class cartRepo extends BaseRepository {
	constructor() {
		super(cart, "cart")
	}

	createCart = async (user_id) => {
		return await this.create({
			_id: user_id,
		})
	}

	updateCart = async ({ user_id, product_list }) => {
		const userCart = (await this.findById(user_id)) || {
			_id: user_id,
			product_list: [],
			status: "active",
		}

		product_list.forEach((product) => {
			const existedProductIndex = userCart.product_list.findIndex(
				({ _id }) => _id == product._id,
			)
			if (existedProductIndex !== -1) {
				userCart.product_list.quantity += product.quantity
				if (userCart.product_list[existedProductIndex].quantity == 0) {
					userCart.product_list.slice(existedProductIndex, 1)
				}
			} else if (product.quantity > 0) {
				userCart.product_list.push(product)
			}
		})

		return await this.findOneAndUpdate({ _id: userCart._id }, userCart)
	}
}

module.exports = new cartRepo()
