const _ = require("lodash")
const SuccessResponse = require("../core/success.response")
const { logger } = require("../plugin")
const { v4 } = require("uuid")

const httpRequestMiddleware = ({
	requestId = true,
	requestLogger = false,
	responseFormatter = true,
}) => {
	return (req, res, next) => {
		if (requestId) {
			// Request id tracking
			req.headers["x-request-id"] = req.headers["x-request-id"] ?? v4()
			logger.info(`RequestId:: ${req.headers["x-request-id"]}`)
		}

		if (requestLogger) {
			// Request logger
			const logs = {}
			;["params", "query", "body"].forEach((logField) => {
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
		}

		if (responseFormatter) {
			// Response formatter
			const responseTypes = Object.keys(SuccessResponse).map(
				(e) => e.split("Response")[0],
			)
			res.sendData = (data, type = responseTypes[0], message) => {
				new SuccessResponse[`${type}Response`]({
					data,
					message,
				}).send(res)
			}
		}
		next()
	}
}

module.exports = httpRequestMiddleware
