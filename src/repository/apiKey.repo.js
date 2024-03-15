const BaseRepository = require("./base.repo")
const { apiKeyModel } = require("../models")
const crypto = require("node:crypto")

class ApiKeyRepository extends BaseRepository {
	constructor() {
		super(apiKeyModel, "api-key")
	}

	createApiKey = async (permission) => {
		return await this.create({
			key: crypto.randomBytes(64).toString("hex"),
			permissions: [permission],
		})
	}

	findByKey = async (key) => {
		return await this.findOne(
			{
				key,
				status: true,
			},
			true,
		)
	}
}

module.exports = new ApiKeyRepository()
