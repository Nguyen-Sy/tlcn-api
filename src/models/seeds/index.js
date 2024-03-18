require("dotenv").config()
require("../../db/init.mongodb")
const redis = require("../../db/init.redis")
const { logger } = require("../../plugin")

const seedApiKey = require("./apikey")
const seedUserLogin = require("./userlogin")

const seed = async () => {
	await redis.flushAll()
	await seedApiKey()
	await seedUserLogin()
}

seed()
	.then(() => {
		logger.info("Seeding success")
		process.exit(0)
	})
	.catch((err) => {
		logger.error(err.message)
	})
