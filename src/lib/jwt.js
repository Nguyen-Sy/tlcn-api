const jwt = require("jsonwebtoken")
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require("../config")

const genPairToken = (payload) => {
	const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
		algorithm: "HS256",
		expiresIn: "15m",
	})
	const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
		algorithm: "HS256",
		expiresIn: "7d",
	})
	return {
		accessToken,
		refreshToken,
	}
}

const decodeRefreshToken = (token) => {
	try {
		return jwt.verify(token, JWT_REFRESH_SECRET, {
			algorithms: "HS256",
		})
	} catch {
		return null
	}
}

const decodeAccessToken = (token) => {
	try {
		return jwt.verify(token, JWT_ACCESS_SECRET, {
			algorithms: "HS256",
		})
	} catch {
		return null
	}
}

module.exports = {
	genPairToken,
	decodeRefreshToken,
	decodeAccessToken,
}
