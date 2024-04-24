"use strict"

const BaseRepository = require("./base.repo")
const { isNull } = require("lodash")
const { shopRegister } = require("../models")

class ShopRegisterRepo extends BaseRepository {
	constructor() {
		super(shopRegister, "shopRegister")
	}

	createShopRegister = async (email) => {
		return await this.create({ email })
	}

	getAllShopRegister = async (verified = null) => {
		const filter = {}
		if (!isNull(verified)) filter.verified = verified
		return await this.find(filter)
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

module.exports = new ShopRegisterRepo()
