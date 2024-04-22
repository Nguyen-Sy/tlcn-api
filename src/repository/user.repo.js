"use strict"

const BaseRepository = require("./base.repo")
const { user } = require("../models")

class userRepo extends BaseRepository {
	constructor() {
		super(user, "user")
	}

	createUser = async ({ email, phone, name, avatar, id: _id }) => {
		return this.create({
			_id,
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

module.exports = new userRepo()
