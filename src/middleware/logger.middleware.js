const _ = require("lodash")
const { logger } = require("../plugin")

const loggerMiddleware = (req, res, next) => {
	const logs = {}
	;[
		"params",
		"query",
		"body",
		// "headers.authorization",
		// "headers.x-rtoken-id",
		// "headers.x-api-key",
	].forEach((logField) => {
		const reqValue = _.get(req, logField)
		if (
			(reqValue &&
				typeof reqValue == "object" &&
				Object.keys(reqValue).length > 0) ||
			typeof reqValue == "string"
		) {
			_.set(logs, logField, _.get(req, logField))
		}
	})
	logger.info(logs)
	next()
}

module.exports = loggerMiddleware
