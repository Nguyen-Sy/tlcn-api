const {
	constant: { CART_MAX_QUANTITY },
} = require("../helper")
const { BadRequestError } = require("../core/error.response")
const { cartRepo, productRepo } = require("../repository")

class CartService {
	static createCart = async (user_id) => {
		return await cartRepo.createCart(user_id)
	}

	static deleteCart = async (user_id) => {
		return await cartRepo.findOneAndUpdate(
			{ _id: user_id },
			{ product_list: [] },
		)
	}

	static getCart = async (user_id) => {
		const { products: product_list } = await cartRepo.find({ _id: user_id })
		let total_price = 0,
			total_quantity = 0
		product_list.forEach(({ quantity, price }) => {
			total_price += price * quantity
			total_quantity += quantity
		})
		return {
			_id: user_id,
			product_list,
			total_price,
			total_quantity,
		}
	}

	static updateCart = async ({ user_id, product_sku_id, quantity }) => {
		const productId = product_sku_id.split("-")[0]
		const [product] = await productRepo.findDetailProducts([productId])

		if (!product) throw new BadRequestError("Invalid product")
		const sku = product.skus.find((sku) => sku.sku_id === product_sku_id)
		if (!sku) throw new BadRequestError("Invalid product")

		const { products } = await cartRepo.findById(user_id)
		let isExisted = false
		let totalQuantity = 0

		for (let i = 0; i < products.length; i++) {
			totalQuantity += products[i].quantity
			if (products[i].product_sku_id === product_sku_id) {
				if (products[i].quantity + quantity <= 0) {
					products.slice(i, 1)
				} else {
					products[i].quantity += quantity
				}
				isExisted = true
			}
		}
		if (!isExisted) {
			if (quantity <= 0) throw new BadRequestError("Invalid quantity")
			products.push({
				product_sku_id,
				name: product.name,
				description: product.description,
				price: sku.price,
				images: product.images,
				quantity,
			})
		}
		if (totalQuantity + quantity > CART_MAX_QUANTITY) {
			throw new BadRequestError(
				`Cart quantity can not exceed ${CART_MAX_QUANTITY}`,
			)
		}

		return await cartRepo.findOneAndUpdate(
			{
				_id: user_id,
			},
			{ products },
		)
	}
}

module.exports = CartService
