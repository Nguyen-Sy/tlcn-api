const { Types } = require("mongoose")
const { user } = require("../index")

const seedUser = async () => {
	await user.collection.drop()
	await user.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a48"),
		email: "admin@gmail.com",
		phone: "0123456789",
		name: "admin",
	})
	await user.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
		email: "user@gmail.com",
		phone: "0123456789",
		name: "user",
	})
	await user.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a4c"),
		email: "shop.1@gmail.com",
		phone: "0123456789",
		name: "shop1",
	})
	await user.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
		email: "shop.2@gmail.com",
		phone: "0123456781",
		name: "shop2",
	})
}

module.exports = seedUser
