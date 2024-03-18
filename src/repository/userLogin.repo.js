const BaseRepository = require("./base.repo")
const { userLoginModel } = require("../models")
const { v4: uuidv4 } = require("uuid")
class UserLoginRepository extends BaseRepository {
	constructor() {
		super(userLoginModel, "user-login")
	}

	createLocalAccount = async ({ email, password }) => {
		return await this.create({
			local: {
				email,
				password,
			},
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
			{ "local.email": email },
			{
				local: {
					email,
				},
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
			{ "local.email": email },
			{
				local: {
					email,
				},
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
				"local.email": email,
			},
			{
				refreshToken: null,
			},
		)
	}

	findByEmail = async (email) => {
		return await this.findOne({
			"local.email": email,
		})
	}

	findByToken = async (token) => {
		return await this.findOne({ token })
	}

	updateRefreshToken = async ({ email, refreshToken }) => {
		return await this.findOneAndUpdate(
			{ "local.email": email },
			{
				$set: { refreshToken },
				$addToSet: { usedRefreshToken: "$refreshToken" },
			},
		)
	}

	updateLoginToken = async ({ email, token }) => {
		return await this.findOneAndUpdate({ "local.email": email }, { token })
	}

	updatePassword = async ({ email, password }) => {
		return await this.findOneAndUpdate(
			{ "local.email": email },
			{ "local.password": password },
		)
	}

	updateVerify = async (email) => {
		return await this.findOneAndUpdate(
			{
				"local.email": email,
			},
			{
				verified: true,
			},
		)
	}

	updateUserRole = async ({ email, role }) => {
		return this.findOneAndUpdate({ "local.email": email }, { role })
	}
}

module.exports = new UserLoginRepository()
