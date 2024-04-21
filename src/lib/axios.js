const axios = require("axios")
const { logger } = require("../plugin")

const createInstance = (baseUrl, config = {}) => {
	const instance = axios.create({
		baseUrl,
		...config,
	})

	instance.interceptors.request.use(
		(config) => {
			return config
		},
		(err) => {
			logger.error(err.message)
			return err
		},
	)

	instance.interceptors.response.use(
		(res) => {
			return res.data
		},
		(err) => {
			logger.error(err.message)
			return err.response.data
		},
	)
}

module.exports = createInstance
