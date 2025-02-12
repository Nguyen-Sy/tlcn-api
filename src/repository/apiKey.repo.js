"use strict"

const BaseRepository = require("./base.repo")
const crypto = require("node:crypto")
const { apiKey } = require("../models")

class ApiKeyRepo extends BaseRepository {
	constructor() {
		super(apiKey, "apiKey")
	}

	createApiKey = async (permission) => {
		return await this.create({
			key: crypto.randomBytes(64).toString("hex"),
			permissions: [permission],
		})
	}

	getApiKeyByKey = async (key) => {
		return await this.findOne(
			{
				key,
				status: true,
			},
			true,
		)
	}
}

module.exports = new ApiKeyRepo()
