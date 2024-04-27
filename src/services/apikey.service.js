"use strict"

const { apiKeyRepo } = require("../repository")

class ApiKeyService {
	static createApikey = async () => {
		return await apiKeyRepo.createApiKey("0000")
	}

	static getApiKeyByKey = async (key) => {
		return await apiKeyRepo.getApiKeyByKey(key)
	}
}

module.exports = ApiKeyService
