require("dotenv").config()
require("../db/init.mongodb")
const redisClient = require("../db/init.redis")
const { apiKeyModel } = require("./index")
const { logger } = require("../plugin")

const seedApiKey = async () => {
	await apiKeyModel.collection.drop()
	await apiKeyModel.create({
		key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWFhIiwidXNlcm5hbWUiOiJhYSIsImlhdCI6MTcxMDU2NDU2NiwiZXhwIjoxNzEwOTk2NTY2LCJpc3MiOiJtZSJ9.Wv1YL9XvWzCoIafTXRWAgoBSxreLd0s-iyTwkPGxbgE",
		permissions: ["0000"],
		status: true,
	})
}

const seed = async () => {
	await redisClient.flushAll()
	await seedApiKey()
	return null
}

seed().then(() => {
	logger.debug("Seeding success")
	process.exit(0)
})
