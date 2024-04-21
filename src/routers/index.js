"use strict"

const express = require("express")
const { apiKey, permission } = require("../middleware/apikey.middleware")

const router = express.Router()

router.use(apiKey)
router.use(permission("0000"))

router.use("/auth", require("./auth"))
router.use("/otp", require("./otp"))
router.use("/user", require("./user"))
router.use("/category", require("./category"))
router.use("/product", require("./product"))
router.use("/inventory", require("./inventory"))

router.get("/", (req, res) => {
	res.sendData("ok")
})

module.exports = router
