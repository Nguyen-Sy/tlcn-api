require("dotenv").config()
const compression = require("compression")
const express = require("express")
const morgan = require("morgan")
const { default: helmet } = require("helmet")
const app = express()
const config = require("./config")

const httpRequest = require("./middleware/httpRequest.middleware")
const {
	handleError,
	handleNotFound,
} = require("./middleware/handleError.middleware")

// database connection
require("./db/init.mongodb")
require("./db/init.redis")

//init middleware
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	}),
)
app.use(httpRequest({ requestLogger: config.NODE_ENV === "DEV" }))
// Show routes called in console during development
if (config.NODE_ENV === "DEV") {
	app.use(morgan("dev"))
}

// init route
app.use("/api/v1", require("./routers"))
app.use(handleNotFound)
app.use(handleError)

module.exports = app
