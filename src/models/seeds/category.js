const category = require("../category.model")
const { Types } = require("mongoose")

const seedUser = async () => {
	await category.collection.drop()
	await category.create({
		_id: new Types.ObjectId("66027b375d1975fcc574b96f"),
		name: "Man",
		root_id: "3c855370-77d5-4d56-b8df-762a499433b7",
		image: "https://promova.com/content/mens_clothing_1f6198db54.png",
		description: "description for man category",
		parent_id: null,
		left: 1,
		right: 6,
	})
	await category.create({
		_id: new Types.ObjectId("66027b375d1975fcc574b974"),
		name: "Man Pant",
		root_id: "3c855370-77d5-4d56-b8df-762a499433b7",
		image: "https://promova.com/content/mens_clothing_1f6198db54.png",
		description: "description for pant category",
		parent_id: "66027b375d1975fcc574b96f",
		left: 2,
		right: 5,
	})
	await category.create({
		_id: new Types.ObjectId("66027b375d1975fcc574b979"),
		name: "Short",
		root_id: "3c855370-77d5-4d56-b8df-762a499433b7",
		image: "https://promova.com/content/mens_clothing_1f6198db54.png",
		description: "description for short category",
		parent_id: "66027b375d1975fcc574b974",
		left: 3,
		right: 4,
	})
	await category.create({
		_id: new Types.ObjectId("66027b375d1975fcc574b96e"),
		name: "Woman",
		root_id: "3c855370-77d5-4d56-b8df-762a499433b8",
		image: "https://promova.com/content/mens_clothing_1f6198db54.png",
		description: "description for woman category",
		parent_id: null,
		left: 1,
		right: 6,
	})
	await category.create({
		_id: new Types.ObjectId("66027b375d1975fcc574b972"),
		name: "Woman Pant",
		root_id: "3c855370-77d5-4d56-b8df-762a499433b8",
		image: "https://promova.com/content/mens_clothing_1f6198db54.png",
		description: "description for woman pant category",
		parent_id: "66027b375d1975fcc574b96f",
		left: 2,
		right: 5,
	})
	await category.create({
		_id: new Types.ObjectId("66027b375d1975fcc572b972"),
		name: "Skirt",
		root_id: "3c855370-77d5-4d56-b8df-762a499433b8",
		image: "https://promova.com/content/mens_clothing_1f6198db54.png",
		description: "description for skirt category",
		parent_id: "66027b375d1975fcc574b974",
		left: 3,
		right: 4,
	})
}

module.exports = seedUser
