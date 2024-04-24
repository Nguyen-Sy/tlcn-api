const { cart } = require("../index")
const { Types } = require("mongoose")

const seedCart = async () => {
	await cart.collection.drop()
	await cart.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a48"),
	})
	await cart.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
	})
	await cart.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
	})
	await cart.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a4c"),
	})
}

module.exports = seedCart
