"use strict"
const redis = require("redis")
const { BadRequestError } = require("../core/error.response")
const { logger } = require("../plugin")
const { REDIS_URL } = require("../config")

class Database {
	#connectionTimeOut

	constructor() {
		this.#connectionTimeOut = null
		this.connect()
	}

	connect() {
		if ("redis://localhost:6379/1") {
			const redisClient = redis.createClient({
				url: "redis://localhost:6379/1",
			})
			redisClient.connect()
			this.client = redisClient
			this.#handleEventConnection(redisClient)
		}
	}

	#handleEventConnection(redisClient) {
		redisClient.on("connect", () => {
			logger.info("Connection to redis created")
			clearTimeout(this.#connectionTimeOut)
		})
		redisClient.on("end", (event) => {
			logger.info("Connection to redis ended")
			this.#handleErrorConnection(event)
		})
		redisClient.on("reconnecting", () => {
			logger.info("Connection to redis reconnecting")
			clearTimeout(this.#connectionTimeOut)
		})
		redisClient.on("error", (event) => {
			logger.info("Connection to redis error")
			this.#handleErrorConnection(event)
		})
	}

	#handleErrorConnection(error) {
		this.#connectionTimeOut = setTimeout(() => {
			throw new BadRequestError(error, -99)
		}, 10000)
	}

	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database()
		}
		return Database.instance
	}
}

// const instanceRedis = Database.getInstance()
const instanceRedis = new Database()
module.exports = instanceRedis.client
