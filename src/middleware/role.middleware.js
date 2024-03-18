const { BadRequestError, ForbiddenError } = require("../core/error.response")
const {
	constant: { ROLES },
} = require("../helper")

const onlyRole = (roles) => {
	return (req, res, next) => {
		const roleKeys = Object.keys(ROLES)
		const rolesValue = roles.map((role) => {
			if (!roleKeys.includes(role))
				throw new BadRequestError("Invalid role::", role)
			return ROLES[role]
		})
		if (!rolesValue.includes(req.user.role)) throw new ForbiddenError()
		next()
	}
}

module.exports = onlyRole
