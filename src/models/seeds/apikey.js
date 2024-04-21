const { apiKey } = require("../index")

const seedApiKey = async () => {
	await apiKey.collection.drop()
	await apiKey.create({
		key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWFhIiwidXNlcm5hbWUiOiJhYSIsImlhdCI6MTcxMDU2NDU2NiwiZXhwIjoxNzEwOTk2NTY2LCJpc3MiOiJtZSJ9.Wv1YL9XvWzCoIafTXRWAgoBSxreLd0s-iyTwkPGxbgE",
		permissions: ["0000"],
		status: true,
	})
}

module.exports = seedApiKey
