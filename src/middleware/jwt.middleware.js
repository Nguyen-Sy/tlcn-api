const {
	jwt: { decodeAccessToken, decodeRefreshToken },
} = require("../lib")
const { UnauthorizedError, BadRequestError } = require("../core/error.response")
const { userLoginRepo } = require("../repository")

const verifyAccessToken = async (req, res, next) => {
	const accessToken = req.headers["Authorization"]
	if (!accessToken) throw new UnauthorizedError("Missing access token")
	const payload = decodeAccessToken(accessToken.split(" ")[1])
	const userLogin = await userLoginRepo.findByEmail(payload.email)
	if (!userLogin) throw new BadRequestError("Invalid access token")
	req.user = userLogin
	next()
}

const verifyRefreshToken = async (req, res, next) => {
	const rawRefreshToken = req.headers["x-rtoken-id"]
	if (!rawRefreshToken) throw new UnauthorizedError("Missing refresh token")
	const refreshToken = rawRefreshToken.split(" ")[1]
	const payload = decodeRefreshToken(refreshToken)
	const userLogin = await userLoginRepo.findByEmail(payload.email)
	if (!userLogin) throw new BadRequestError("Invalid refresh token")
	req.user = userLogin
	req.refreshToken = refreshToken
	next()
}

module.exports = {
	verifyAccessToken,
	verifyRefreshToken,
}
