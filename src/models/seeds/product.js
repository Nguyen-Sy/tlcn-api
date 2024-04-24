const product = require("../products.model")
const { Types } = require("mongoose")

const seedProduct = async () => {
	await product.collection.drop()

	await product.create({
		_id: new Types.ObjectId("65fdca23ef2e1fca31d161d7"),
		name: "Man watch",
		description: "Description",
		images: ["images1", "images2"],
		category: new Types.ObjectId("66027b375d1975fcc574b96f"),
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
		variations: [
			{
				name: "size",
				options: ["S", "M", "L"],
				images: ["image1", "image2"],
			},
		],
		rating: 4.5,
		price: 60000,
		is_published: false,
		is_deleted: false,
		attributes: { key: "value" },
	})
	await product.create({
		_id: new Types.ObjectId("65fdca23ef2e1fca32d161d7"),
		name: "Man jean pant",
		description: "Description",
		images: ["images1", "images2"],
		category: new Types.ObjectId("66027b375d1975fcc574b974"),
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
		variations: [
			{
				name: "size",
				options: ["S", "M"],
				images: ["image1", "image2"],
			},
			{
				name: "color",
				options: ["black", "gray"],
				images: ["image1", "image2"],
			},
		],
		rating: 4.5,
		price: 80000,
		is_published: false,
		is_deleted: false,
		attributes: { key: "value" },
	})
	await product.create({
		_id: new Types.ObjectId("65fdca23ef2e1fca33d161d7"),
		name: "Man short",
		description: "Description",
		images: ["images1", "images2"],
		category: new Types.ObjectId("66027b375d1975fcc574b979"),
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
		variations: [
			{
				name: "size",
				options: ["S", "M"],
				images: ["image1", "image2"],
			},
		],
		rating: 4.5,
		price: 100000,
		is_published: false,
		is_deleted: false,
		attributes: { key: "value" },
	})
	await product.create({
		_id: new Types.ObjectId("65fdca23ef2e1fca31d121d7"),
		name: "Woman purse",
		description: "Description",
		images: ["images1", "images2"],
		category: new Types.ObjectId("66027b375d1975fcc574b96e"),
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
		variations: [
			{
				name: "size",
				options: ["S", "M", "L"],
				images: ["image1", "image2"],
			},
		],
		rating: 4.5,
		price: 60000,
		is_published: false,
		is_deleted: false,
		attributes: { key: "value" },
	})
	await product.create({
		_id: new Types.ObjectId("65fdca23ef2e1fca32d161d1"),
		name: "Woman T-shirt",
		description: "Description",
		images: ["images1", "images2"],
		category: new Types.ObjectId("66027b375d1975fcc574b972"),
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
		variations: [
			{
				name: "size",
				options: ["S", "M"],
				images: ["image1", "image2"],
			},
			{
				name: "color",
				options: ["black", "gray"],
				images: ["image1", "image2"],
			},
		],
		rating: 4.5,
		price: 80000,
		is_published: false,
		is_deleted: false,
		attributes: { key: "value" },
	})
	await product.create({
		_id: new Types.ObjectId("65fdca23ef2e1fca33d161d4"),
		name: "Woman skirt",
		description: "Description",
		images: ["images1", "images2"],
		category: new Types.ObjectId("66027b375d1975fcc572b972"),
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
		variations: [
			{
				name: "size",
				options: ["S", "M"],
				images: ["image1", "image2"],
			},
		],
		rating: 4.5,
		price: 100000,
		is_published: false,
		is_deleted: false,
		attributes: { key: "value" },
	})
}
module.exports = seedProduct
