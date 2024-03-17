const BaseRepository = require("./base.repo")
const { v4: uuidv4 } = require("uuid")
const { userLoginModel } = require("../models")

class UserLoginRepository extends BaseRepository {
	constructor() {
		super(userLoginModel, "user-login")
	}

	createLocalAccount = async ({ email, password }) => {
		return await this.create({
			email,
			password,
			token: uuidv4(),
		})
	}

	createFacebookAccount = async ({
		email,
		id,
		avatar,
		name,
		refreshToken,
	}) => {
		return await this.findOneAndUpdate(
			{ email },
			{
				facebook: {
					id,
					avatar,
					name,
					refreshToken,
				},
				verified: true,
			},
		)
	}

	createGoogleAccount = async ({ email, id, avatar, name, refreshToken }) => {
		return await this.findOneAndUpdate(
			{ email },
			{
				google: {
					id,
					avatar,
					name,
					refreshToken,
				},
				verified: true,
			},
		)
	}

	deleteRefreshToken = async (email) => {
		return await this.findOneAndUpdate(
			{
				email,
			},
			{
				refreshToken: null,
			},
		)
	}

	findByEmail = async (email) => {
		return await this.findOne({
			email,
		})
	}

	findByToken = async (token) => {
		return await this.findOne({ token })
	}

	updateRefreshToken = async ({ email, refreshToken }) => {
		return await this.findOneAndUpdate(
			{ email },
			{
				$set: { refreshToken },
				$addToSet: { usedRefreshToken: "$refreshToken" },
			},
		)
	}

	updateLoginToken = async ({ email, token }) => {
		return await this.findOneAndUpdate({ email }, { token })
	}

	updatePassword = async ({ email, password }) => {
		return await this.findOneAndUpdate({ email }, { password })
	}

	updateVerify = async (email) => {
		return await this.findOneAndUpdate(
			{
				email,
			},
			{
				verified: true,
			},
		)
	}
}

module.exports = new UserLoginRepository()
