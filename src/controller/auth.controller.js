const { AuthService } = require("../services")

class AuthController {
	signUp = async (req, res) => {
		res.sendData(await AuthService.signUp(req.body))
	}

	loginLocal = async (req, res) => {
		res.sendData(await AuthService.loginLocal(req.body))
	}

	loginFacebookCallback = async (req, res) => {
		const tokenLogin = await AuthService.loginFacebook(req.user)
		res.redirect(`/api/v1/auth/social/${tokenLogin}`)
	}

	loginGoogleCallback = async (req, res) => {
		const tokenLogin = await AuthService.loginGoogle(req.user)
		res.redirect(`/api/v1/auth/social/${tokenLogin}`)
	}

	logout = async (req, res) => {
		res.sendData(await AuthService.logout(req.user.email))
	}

	social = async (req, res) => {
		res.sendData(await AuthService.loginSocialSuccess(req.query))
	}

	handleRefreshToken = async (req, res) => {
		res.sendData(
			await AuthService.handleRefreshToken({
				userLogin: req.user,
				refreshToken: req.headers["x-rtoken-id"].split(" ")[1],
			}),
		)
	}
}

module.exports = new AuthController()
