const UserService = require("../services/user.service")

class UserController {
	registerShop = async (req, res) => {
		res.sendData(await UserService.shopRegister(req.user))
	}

	verifyShop = async (req, res) => {
		res.sendData(await UserService.verifyRegister(req.params.id))
	}

	getAllRegisterShop = async (req, res) => {
		res.sendData(await UserService.getAllRegister())
	}
}

module.exports = new UserController()
