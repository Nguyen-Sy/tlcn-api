"use strict"

const BaseRepository = require("./base.repo")
const { cart } = require("../models")

class CartRepo extends BaseRepository {
	constructor() {
		super(cart, "cart")
	}

	createCart = async (user_id) => {
		return await this.create({
			_id: user_id,
		})
	}
}

module.exports = new CartRepo()
