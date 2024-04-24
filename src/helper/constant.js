const COMMON_STATUSES = ["active", "inactive"]

const API_KEY_PERMISSIONS = {
	ALL: "0000",
	PREMIUM: "1111",
	FREE: "2222",
}

const CART_STATUS = [...COMMON_STATUSES, "pending"]

const DISCOUNT_APPLY_TO = ["delivery", "product"]
const DISCOUNT_TYPE = ["percent", "fix_amount"]
const DISCOUNT_STATUS = [...COMMON_STATUSES]

const INVENTORY_STATUS = ["in_used", "out_of_stock", "pending"]

const OTP_EXPIRE_TIMES = {
	verify: 3600 * 24, // 24h
	forgot: 3600, // 1h
}

const USER_ROLES = {
	USER: "0001",
	SHOP: "0002",
	ADMIN: "0003",
}

module.exports = {
	API_KEY_PERMISSIONS,
	CART_STATUS,
	DISCOUNT_APPLY_TO,
	DISCOUNT_TYPE,
	DISCOUNT_STATUS,
	INVENTORY_STATUS,
	OTP_EXPIRE_TIMES,
	USER_ROLES,
}
