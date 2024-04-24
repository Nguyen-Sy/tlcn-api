const {
	constant: { USER_ROLES },
} = require("../helper")
const { BadRequestError, ForbiddenError } = require("../core/error.response")

const onlyRole = (roles) => {
	return (req, res, next) => {
		const roleKeys = Object.keys(USER_ROLES)
		const rolesValue = roles.map((role) => {
			if (!roleKeys.includes(role))
				throw new BadRequestError("Invalid role::", role)
			return USER_ROLES[role]
		})
		if (!rolesValue.includes(req.user.role)) throw new ForbiddenError()
		next()
	}
}

module.exports = onlyRole
