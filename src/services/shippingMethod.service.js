"use strict"
const { BadRequestError } = require("../core/error.response")
const { shippingMethodRepo } = require("../repository")

class ShippingMethodService {
	static createShippingMethod = async ({ name, logo, price }) => {
		return await shippingMethodRepo.createShippingMethod({
			name,
			logo,
			price,
		})
	}

	static deleteShippingMethod = async (id) => {
		await shippingMethodRepo.findOneAndDelete({ _id: id })
		return true
	}

	static getShippingMethod = async () => {
		return await shippingMethodRepo.find()
	}

	static updateShippingMethod = async ({ id, name, logo, price }) => {
		return await shippingMethodRepo.updateShippingMethod({
			id,
			name,
			logo,
			price,
		})
	}

	static calculateDeliveryFee = async ({
		// eslint-disable-next-line no-unused-vars
		userAddress,
		// eslint-disable-next-line no-unused-vars
		shopAddress,
		shippingMethodId,
	}) => {
		const shippingMethod =
			await shippingMethodRepo.findById(shippingMethodId)
		if (!shippingMethod)
			throw new BadRequestError("Shipping methods is not existed")
		// ! HARDCODE delivery fee
		return 20000
	}
}

module.exports = ShippingMethodService
