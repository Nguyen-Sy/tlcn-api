const ROLES = {
	USER: "0001",
	SHOP: "0002",
	ADMIN: "0003",
}

const EXPIRE_TIMES = {
	verify: 3600 * 24, // 24h
	forgot: 3600, // 1h
}

module.exports = {
	ROLES,
	EXPIRE_TIMES,
}
