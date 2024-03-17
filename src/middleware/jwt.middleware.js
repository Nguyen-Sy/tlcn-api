const { ForbiddenError } = require("../core/error.response")
const { userLoginRepository } = require("../repository")
const { decodeAccessToken, decodeRefreshToken } = require("../utils")

const verifyAccessToken = async (req, res, next) => {
	const accessToken = req.headers["Authorization"]
	if (!accessToken) throw new ForbiddenError("Missing access token")
	const payload = decodeAccessToken(accessToken.split(" ")[1])
	const userLogin = await userLoginRepository.findByEmail(payload.email)
	if (!userLogin) throw new ForbiddenError("Invalid access token")
	req.user = userLogin
	next()
}

const verifyRefreshToken = async (req, res, next) => {
	const refreshToken = req.headers["x-rtoken-id"]
	if (!refreshToken) throw new ForbiddenError("Missing refresh token")
	const payload = decodeRefreshToken(refreshToken.split(" ")[1])
	const userLogin = await userLoginRepository.findByEmail(payload.email)
	if (!userLogin) throw new ForbiddenError("Invalid refresh token")
	req.user = userLogin
	next()
}

module.exports = {
	verifyAccessToken,
	verifyRefreshToken,
}
