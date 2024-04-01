const productModel = require("../products.model")
const { Types } = require("mongoose")

const seedProduct = async () => {
	await productModel.collection.drop()

	await productModel.create({
		_id: new Types.ObjectId("65fdca23ef2e1fca31d161d7"),
		name: "Man product 1",
		description: "Description",
		images: ["images1", "images2"],
		category: new Types.ObjectId("66027b375d1975fcc574b96f"),
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
		variations: [],
		rating: 4.5,
		price: 60000,
		isPublished: false,
		isDeleted: false,
	})
	await productModel.create({
		_id: new Types.ObjectId("65fdca23ef2e1fca32d161d7"),
		name: "Man Pant product 1",
		description: "Description",
		images: ["images1", "images2"],
		category: new Types.ObjectId("66027b375d1975fcc574b974"),
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
		variations: [],
		rating: 4.5,
		price: 80000,
		isPublished: false,
		isDeleted: false,
	})
	await productModel.create({
		_id: new Types.ObjectId("65fdca23ef2e1fca33d161d7"),
		name: "Man short 1",
		description: "Description",
		images: ["images1", "images2"],
		category: new Types.ObjectId("66027b375d1975fcc574b979"),
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
		variations: [],
		rating: 4.5,
		price: 100000,
		isPublished: false,
		isDeleted: false,
	})
	await productModel.create({
		_id: new Types.ObjectId("65fdca23ef2e1fca31d121d7"),
		name: "Woman product 1",
		description: "Description",
		images: ["images1", "images2"],
		category: new Types.ObjectId("66027b375d1975fcc574b96e"),
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
		variations: [],
		rating: 4.5,
		price: 60000,
		isPublished: false,
		isDeleted: false,
	})
	await productModel.create({
		_id: new Types.ObjectId("65fdca23ef2e1fca32d161d1"),
		name: "Woman Pant product 1",
		description: "Description",
		images: ["images1", "images2"],
		category: new Types.ObjectId("66027b375d1975fcc574b972"),
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
		variations: [],
		rating: 4.5,
		price: 80000,
		isPublished: false,
		isDeleted: false,
	})
	await productModel.create({
		_id: new Types.ObjectId("65fdca23ef2e1fca33d161d4"),
		name: "Woman skirt 1",
		description: "Description",
		images: ["images1", "images2"],
		category: new Types.ObjectId("66027b375d1975fcc572b972"),
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
		variations: [],
		rating: 4.5,
		price: 100000,
		isPublished: false,
		isDeleted: false,
	})
}
module.exports = seedProduct
