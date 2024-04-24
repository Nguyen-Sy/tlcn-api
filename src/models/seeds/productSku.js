const productSku = require("../productSku.model")

const seedProductSku = async () => {
	await productSku.collection.drop()

	await productSku.create({
		sku_id: "65fdca23ef2e1fca31d161d7-65f7ec34086229fc88e93a4a-0",
		tier_idx: [0],
		is_default: true,
		is_published: false,
		is_deleted: false,
		price: 60000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca31d161d7-65f7ec34086229fc88e93a4a-1",
		tier_idx: [1],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 60000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca31d161d7-65f7ec34086229fc88e93a4a-2",
		tier_idx: [2],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 60000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca32d161d7-65f7ec34086229fc88e93a4a-0.0",
		tier_idx: [0, 0],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 80000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca32d161d7-65f7ec34086229fc88e93a4a-0.1",
		tier_idx: [0, 1],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 80000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca32d161d7-65f7ec34086229fc88e93a4a-1.0",
		tier_idx: [1, 0],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 80000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca32d161d7-65f7ec34086229fc88e93a4a-1.1",
		tier_idx: [1, 1],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 80000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca33d161d7-65f7ec34086229fc88e93a4a-0",
		tier_idx: [0],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 80000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca33d161d7-65f7ec34086229fc88e93a4a-1",
		tier_idx: [1],
		is_default: true,
		is_published: false,
		is_deleted: false,
		price: 100000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca31d121d7-65f7ec34086229fc88e93a4b-0",
		tier_idx: [0],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 100000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca31d121d7-65f7ec34086229fc88e93a4b-1",
		tier_idx: [1],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 100000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca31d121d7-65f7ec34086229fc88e93a4b-2",
		tier_idx: [2],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 60000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca32d161d1-65f7ec34086229fc88e93a4b-0.0",
		tier_idx: [0, 0],
		is_default: true,
		is_published: false,
		is_deleted: false,
		price: 60000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca32d161d1-65f7ec34086229fc88e93a4b-0.1",
		tier_idx: [0, 1],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 60000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca32d161d1-65f7ec34086229fc88e93a4b-1.0",
		tier_idx: [1, 0],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 60000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca32d161d1-65f7ec34086229fc88e93a4b-1.1",
		tier_idx: [1, 1],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 80000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca33d161d4-65f7ec34086229fc88e93a4b-0",
		tier_idx: [0],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 60000,
		priority_sort: 0,
	})
	await productSku.create({
		sku_id: "65fdca23ef2e1fca33d161d4-65f7ec34086229fc88e93a4b-1",
		tier_idx: [1],
		is_default: false,
		is_published: false,
		is_deleted: false,
		price: 100000,
		priority_sort: 0,
	})
}
module.exports = seedProductSku
