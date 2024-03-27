"use strict"

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
		return await this.findOne(
			{
				"local.email": email,
			},
			true,
		)
	}

	findByToken = async (token) => {
		return await this.findOne({ token })
	}

	updateRefreshToken = async ({ email, refreshToken }) => {
		const updatedUser = await this.findOneAndUpdate(
			{ "local.email": email },
			{
				$set: { refreshToken },
				$addToSet: { usedRefreshToken: "$refreshToken" },
			},
		)
		await this.set(`${this.name}:local.email:${email}`, updatedUser)
		return updatedUser
	}

	updateLoginToken = async ({ email, token }) => {
		const updatedUser = await this.findOneAndUpdate(
			{ "local.email": email },
			{ token },
		)
		await this.set(`${this.name}:local.email:${email}`, updatedUser)
		return updatedUser
	}

	updatePassword = async ({ email, password }) => {
		const updatedUser = await this.findOneAndUpdate(
			{ "local.email": email },
			{ "local.password": password },
		)
		await this.set(`${this.name}:local.email:${email}`, updatedUser)
		return updatedUser
	}

	updateVerify = async (email) => {
		const updatedUser = await this.findOneAndUpdate(
			{
				"local.email": email,
			},
			{
				verified: true,
			},
		)
		await this.set(`${this.name}:local.email:${email}`, updatedUser)
		return updatedUser
	}

	updateUserRole = async ({ email, role }) => {
		const updatedUser = this.findOneAndUpdate(
			{ "local.email": email },
			{ role },
		)
		await this.set(`${this.name}:local.email:${email}`, updatedUser)
		return updatedUser
	}
}

module.exports = new UserLoginRepository()
