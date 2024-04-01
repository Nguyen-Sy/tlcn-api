const categoryModel = require("../category.model")
const { Types } = require("mongoose")

const seedUser = async () => {
	await categoryModel.collection.drop()
	await categoryModel.create({
		_id: new Types.ObjectId("66027b375d1975fcc574b96f"),
		name: "Man",
		rootId: "3c855370-77d5-4d56-b8df-762a499433b7",
		image: "https://promova.com/content/mens_clothing_1f6198db54.png",
		description: "description for man category",
		parentId: null,
		left: 1,
		right: 6,
	})
	await categoryModel.create({
		_id: new Types.ObjectId("66027b375d1975fcc574b974"),
		name: "Man Pant",
		rootId: "3c855370-77d5-4d56-b8df-762a499433b7",
		image: "https://promova.com/content/mens_clothing_1f6198db54.png",
		description: "description for pant category",
		parentId: "66027b375d1975fcc574b96f",
		left: 2,
		right: 5,
	})
	await categoryModel.create({
		_id: new Types.ObjectId("66027b375d1975fcc574b979"),
		name: "Short",
		rootId: "3c855370-77d5-4d56-b8df-762a499433b7",
		image: "https://promova.com/content/mens_clothing_1f6198db54.png",
		description: "description for short category",
		parentId: "66027b375d1975fcc574b974",
		left: 3,
		right: 4,
	})
	await categoryModel.create({
		_id: new Types.ObjectId("66027b375d1975fcc574b96e"),
		name: "Woman",
		rootId: "3c855370-77d5-4d56-b8df-762a499433b8",
		image: "https://promova.com/content/mens_clothing_1f6198db54.png",
		description: "description for woman category",
		parentId: null,
		left: 1,
		right: 6,
	})
	await categoryModel.create({
		_id: new Types.ObjectId("66027b375d1975fcc574b972"),
		name: "Woman Pant",
		rootId: "3c855370-77d5-4d56-b8df-762a499433b8",
		image: "https://promova.com/content/mens_clothing_1f6198db54.png",
		description: "description for woman pant category",
		parentId: "66027b375d1975fcc574b96f",
		left: 2,
		right: 5,
	})
	await categoryModel.create({
		_id: new Types.ObjectId("66027b375d1975fcc572b972"),
		name: "Skirt",
		rootId: "3c855370-77d5-4d56-b8df-762a499433b8",
		image: "https://promova.com/content/mens_clothing_1f6198db54.png",
		description: "description for skirt category",
		parentId: "66027b375d1975fcc574b974",
		left: 3,
		right: 4,
	})
}

module.exports = seedUser
