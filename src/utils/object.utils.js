const { isNull, isUndefined, isEmpty } = require("lodash")

const removeEmptyField = (obj) => {
	const entries = []
	Object.entries(obj).forEach(([key, value]) => {
		if (!(isNull(value) || isUndefined(value) || isEmpty(value))) {
			entries.push([key, value])
		}
	})
	return Object.fromEntries(entries)
}

module.exports = {
	removeEmptyField,
}
