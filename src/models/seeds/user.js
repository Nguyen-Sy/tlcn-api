const { Types } = require("mongoose")
const { userModel } = require("../index")

const seedUser = async () => {
	await userModel.collection.drop()
	await userModel.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a48"),
		email: "admin@gmail.com",
		phone: "0123456789",
		name: "admin",
	})
	await userModel.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a4c"),
		email: "user@gmail.com",
		phone: "0123456789",
		name: "user",
	})
	await userModel.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
		email: "shop@gmail.com",
		phone: "0123456789",
		name: "shop",
	})
}

module.exports = seedUser
