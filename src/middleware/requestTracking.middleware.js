const { v4: uuidv4 } = require("uuid")

const requestTracking = (req, res, next) => {
	req.requestId = req.headers["x-request-id"]
		? req.headers["x-request-id"]
		: uuidv4()
	next()
}

module.exports = requestTracking
