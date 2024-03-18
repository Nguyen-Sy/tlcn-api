"use strict"

const BaseRepository = require("./base.repo")
const { userModel } = require("../models")

class UserRepository extends BaseRepository {
	constructor() {
		super(userModel, "user")
	}

	createUser = async ({ email, phone, name, avatar }) => {
		return this.create({
			email,
			phone,
			name,
			avatar,
		})
	}

	findByEmail = async (email) => {
		return this.findOne({ email })
	}
}

module.exports = new UserRepository()
