"use strict"

const BaseRepository = require("./base.repo")
const { userLogin } = require("../models")
const { v4: uuidv4 } = require("uuid")

class userLoginRepo extends BaseRepository {
	constructor() {
		super(userLogin, "userLogin")
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
					refresh_token: refreshToken,
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
					refresh_token: refreshToken,
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
				refresh_token: null,
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

module.exports = new userLoginRepo()
