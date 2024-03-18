"use strict"

const BaseRepository = require("./base.repo")
const { shopRegisterModel } = require("../models")

class OtpRepository extends BaseRepository {
	constructor() {
		super(shopRegisterModel, "shop-register-history")
	}

	createShopRegister = async (email) => {
		return await this.create({ email })
	}

	getAllShopRegister = async () => {
		return await this.find({})
	}

	verifyShopRegister = async (id) => {
		return await this.findOneAndUpdate(
			{
				_id: id,
			},
			{
				verified: true,
			},
		)
	}
}

module.exports = new OtpRepository()
