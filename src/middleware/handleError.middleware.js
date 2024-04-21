const { logger } = require("../plugin")
const { NODE_ENV } = require("../config")

const handleNotFound = (req, res, next) => {
	const error = new Error("Not found")
	error.status = 404
	next(error)
}

// eslint-disable-next-line no-unused-vars
const handleError = (error, req, res, next) => {
	const statusCode = error.status ? error.status : 500

	logger.error(error.message, {
		requestId: req.requestId,
		context: error.context,
	})

	if (statusCode == 500 && NODE_ENV == "DEV") {
		console.log(error.stack)
	}

	return res.status(statusCode).json({
		status: "Error",
		code: statusCode,
		message: error.message || "Internal Server error",
	})
}

module.exports = {
	handleError,
	handleNotFound,
}
