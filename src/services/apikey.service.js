"use strict"

const { apiKeyRepo } = require("../repository")

class ApiKeyService {
	static createApikey = async () => {
		return await apiKeyRepo.createApiKey("0000")
	}

	static findApikeyByKey = async (key) => {
		return await apiKeyRepo.findByKey(key)
	}
}

module.exports = ApiKeyService
