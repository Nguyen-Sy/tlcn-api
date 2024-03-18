"use strict"

const bcrypt = require("bcrypt")
const passport = require("passport")
const { Strategy: FacebookStrategy } = require("passport-facebook")
const { Strategy: GoogleStrategy } = require("passport-google-oauth20")
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")
const { Strategy: LocalStrategy } = require("passport-local")

const {
	JWT_ACCESS_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	FACEBOOK_CLIENT_ID,
	FACEBOOK_CLIENT_SECRET,
} = require("../config")
const { BadRequestError } = require("../core/error.response")
const { userLoginRepository } = require("../repository")

passport.use(
	new LocalStrategy(
		{
			passwordField: "password",
			usernameField: "email",
			session: false,
		},
		async (email, password, done) => {
			const foundUserLogin = await userLoginRepository.findByEmail(email)
			if (foundUserLogin) {
				if (!bcrypt.compareSync(password, foundUserLogin.password)) {
					return done(new BadRequestError("Invalid email/password"))
				}
			}
			return done(null, { email, password })
		},
	),
)

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest:
				ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
			secretOrKey: JWT_ACCESS_SECRET,
			algorithms: "HS256",
		},
		async (payload, done) => {
			const user = await userLoginRepository.findByEmail(payload.email)
			if (!user || payload.exp > Date.now())
				return done(new BadRequestError("Invalid token"))
			return done(null, user)
		},
	),
)

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: "/api/v1/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			return done(null, {
				accessToken,
				refreshToken,
				profile: {
					id: profile.id,
					email: profile.emails[0]?.value,
					name: profile?.displayName,
					avatar: profile?.photos[0]?.value,
				},
			})
		},
	),
)

passport.use(
	new FacebookStrategy(
		{
			clientID: FACEBOOK_CLIENT_ID,
			clientSecret: FACEBOOK_CLIENT_SECRET,
			callbackURL: "/api/v1/auth/facebook/callback",
			profileFields: ["email", "photos", "id", "displayName"],
		},
		async (accessToken, refreshToken, profile, done) => {
			return done(null, {
				accessToken,
				refreshToken,
				profile: {
					id: profile.id,
					email: profile.emails[0]?.value,
					name: profile?.displayName,
					avatar: profile?.photos[0]?.value,
				},
			})
		},
	),
)

module.exports = passport
