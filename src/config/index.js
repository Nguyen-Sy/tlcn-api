module.exports = {
	NODE_ENV: process.env.NODE_ENV || "DEV",
	APP_PORT: process.env.APP_PORT || "5000",

	DB_URL: process.env.DB_URL || "mongodb://localhost:27017",
	DB_NAME: process.env.DB_NAME || "temp",
	REDIS_URL: process.env.REDIS_URL,

	WRITE_LOG_FILE:
		Boolean(process.env.WRITE_LOG_FILE == "true") ||
		this.NODE_ENV == "PROD",

	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

	FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
	FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,

	WEBSITE_URL: process.env.WEBSITE_URL,

	NODEMAILER_USER: process.env.NODEMAILER_USER,
	NODEMAILER_PASS: process.env.NODEMAILER_PASS,
}
