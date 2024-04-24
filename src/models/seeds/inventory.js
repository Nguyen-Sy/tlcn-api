const inventory = require("../inventory.model")
const { Types } = require("mongoose")

const seedProductSku = async () => {
	await inventory.collection.drop()

	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca31d161d7-65f7ec34086229fc88e93a4a-0",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca31d161d7-65f7ec34086229fc88e93a4a-1",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca31d161d7-65f7ec34086229fc88e93a4a-2",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca32d161d7-65f7ec34086229fc88e93a4a-0.0",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca32d161d7-65f7ec34086229fc88e93a4a-0.1",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca32d161d7-65f7ec34086229fc88e93a4a-1.0",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca32d161d7-65f7ec34086229fc88e93a4a-1.1",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca33d161d7-65f7ec34086229fc88e93a4a-0",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca33d161d7-65f7ec34086229fc88e93a4a-1",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca31d121d7-65f7ec34086229fc88e93a4b-0",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca31d121d7-65f7ec34086229fc88e93a4b-1",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca31d121d7-65f7ec34086229fc88e93a4b-2",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca32d161d1-65f7ec34086229fc88e93a4b-0.0",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca32d161d1-65f7ec34086229fc88e93a4b-0.1",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca32d161d1-65f7ec34086229fc88e93a4b-1.0",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca32d161d1-65f7ec34086229fc88e93a4b-1.1",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca33d161d4-65f7ec34086229fc88e93a4b-0",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
	})
	await inventory.create({
		product_sku_id: "65fdca23ef2e1fca33d161d4-65f7ec34086229fc88e93a4b-1",
		price: 10000,
		stock: 100,
		status: "pending",
		shop: new Types.ObjectId("65f7ec34086229fc88e93a4b"),
	})
}
module.exports = seedProductSku
