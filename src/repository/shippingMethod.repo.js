"use strict"

const BaseRepository = require("./base.repo")
const { shippingMethod } = require("../models")

const {
	object: { removeEmptyField },
} = require("../utils")

class ShippingMethod extends BaseRepository {
	constructor() {
		super(shippingMethod, "shippingMethod")
	}

	createShippingMethod = async ({ name, logo, price }) => {
		return await this.create({ name, logo, price })
	}

	updateShippingMethod = async ({ name, logo, price, id }) => {
		return await this.findOneAndUpdate(
			{ _id: id },
			removeEmptyField({ name, logo, price }),
		)
	}

	deleteShippingMethod = async (id) => {
		return await this.findOneAndDelete({ _id: id })
	}
}

module.exports = new ShippingMethod()
