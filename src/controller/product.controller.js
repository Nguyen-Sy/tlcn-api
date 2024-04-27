const { ProductService } = require("../services")

class ProductController {
	createProduct = async (req, res) => {
		res.sendData(
			await ProductService.createProduct({
				...req.body,
				shop: req.user._id,
			}),
		)
	}

	updateProduct = async (req, res) => {
		res.sendData(await ProductService.updateProduct(req.body))
	}

	publishProduct = async (req, res) => {
		res.sendData(await ProductService.publishProduct(req.params.id))
	}

	unpublishProduct = async (req, res) => {
		res.sendData(await ProductService.unpublishProduct(req.params.id))
	}

	getProduct = async (req, res) => {
		res.sendData(await ProductService.getProduct(req.query))
	}

	findProductDetail = async (req, res) => {
		res.sendData(await ProductService.getProductDetail(req.params.id))
	}
}

module.exports = new ProductController()
