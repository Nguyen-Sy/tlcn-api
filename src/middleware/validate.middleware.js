const { BadRequestError } = require("../core/error.response")

const defaultSchemas = { body: null, query: null, params: null }
const validate = (schema = defaultSchemas) => {
	return (req, res, next) => {
		const validateFields = ["body", "query", "params"]
		validateFields.forEach((field) => {
			if (schema[field]) {
				const { error, value } = schema[field].validate(req[field], {
					abortEarly: false,
				})
				if (error) throw new BadRequestError(error.message)
				req[field] = value
			}
		})
		next()
	}
}

module.exports = validate
