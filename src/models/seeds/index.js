require("dotenv").config()
require("../../db/init.mongodb")
const redis = require("../../db/init.redis")
const { logger } = require("../../plugin")

const seedApiKey = require("./apikey")
const seedCart = require("./cart")
const seedCategory = require("./category")
const seedProduct = require("./product")
const seedUser = require("./user")
const seedUserLogin = require("./userlogin")

const seed = async () => {
	await redis.flushAll()
	await seedApiKey()
	await seedUserLogin()
	await seedUser()
	await seedCategory()
	await seedProduct()
	await seedCart()
}

seed()
	.then(() => {
		logger.info("Seeding success")
		process.exit(0)
	})
	.catch((err) => {
		logger.error(err.message)
	})
