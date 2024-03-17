const {
	GOOGLE_CLIENT_ID,
	FACEBOOK_CLIENT_ID,
	FACEBOOK_CLIENT_SECRET,
} = require("../config")
const axios = require("axios")
const redis = require("../db/init.redis")

const verifyFacebookToken = async (token) => {
	const getInputKey = async (cache = true) => {
		const redisVerifyFacebookKey = "facebook:verify:input_key"
		let inputToken
		if (cache) {
			inputToken = await redis.get(redisVerifyFacebookKey)
			return inputToken
		}
		if (!inputToken) {
			const {
				data: { accessToken },
			} = await axiosClient.get(
				`oauth/access_token?client_id=${FACEBOOK_CLIENT_ID}&client_secret=${FACEBOOK_CLIENT_SECRET}&grant_type=client_credentials`,
			)
			redis.set(redisVerifyFacebookKey, accessToken)
			inputToken = accessToken
		}
		return inputToken
	}

	const axiosClient = axios.create({
		baseUrl: "https://graph.facebook.com",
	})

	let response = await axiosClient.get(
		`/debug-token?input_token=${await getInputKey()}?access_token=${token}`,
	)
	if (response.status != 200) {
		response = await axiosClient.get(
			`/debug-token?input_token=${await getInputKey(false)}?access_token=${token}`,
		)
	}
	return response?.data.data.is_valid || false
}

const verifyGoogleToken = async (token) => {
	const axiosClient = axios.create({
		baseUrl: "https://oauth2.googleapis.com",
	})

	const {
		data: { aud, exp },
	} = await axiosClient.get(`tokeninfo?id_token=${token}`)
	return aud === GOOGLE_CLIENT_ID && exp < Date.now()
}

module.exports = {
	verifyFacebookToken,
	verifyGoogleToken,
}
