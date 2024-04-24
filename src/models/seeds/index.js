require("dotenv").config()
require("../../db/init.mongodb")
const redis = require("../../db/init.redis")
const { logger } = require("../../plugin")

const seedApiKey = require("./apikey")
const seedCart = require("./cart")
const seedCategory = require("./category")
const seedDiscount = require("./discount")
const seedInventory = require("./inventory")
const seedProduct = require("./product")
const seedProductSku = require("./productSku")
const seedUser = require("./user")
const seedUserLogin = require("./userlogin")

const seed = async () => {
	await redis.flushAll()
	await seedApiKey()
	await seedUserLogin()
	await seedUser()
	await seedCategory()
	await seedProduct()
	await seedProductSku()
	await seedCart()
	await seedInventory()
	await seedDiscount()
}

seed()
	.then(() => {
		logger.info("Seeding success")
		process.exit(0)
	})
	.catch((err) => {
		logger.error(err.message)
	})
