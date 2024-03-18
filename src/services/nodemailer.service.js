"use strict"
const mailgen = require("mailgen")
const nodemailer = require("nodemailer")
const { logger } = require("../plugin")
const { WEBSITE_URL, NODEMAILER_USER, NODEMAILER_PASS } = require("../config")

class NodemailerService {
	static #sendMail = async ({ emailBody, email, mailSubject }) => {
		let transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: NODEMAILER_USER,
				pass: NODEMAILER_PASS,
			},
		})

		const mailGenerator = new mailgen({
			theme: "salted",
			product: {
				link: WEBSITE_URL,
				logo: "https://res.cloudinary.com/dooxj3ome/image/upload/v1710575441/ekkkkkutn9clmckukfvw.png",
				name: "Visums eCommerce",
				copyright: "Copyright © 2023 Visums. All rights reserved.",
				logoHeight: "150px",
			},
		})

		const mail = mailGenerator.generate(emailBody)

		const mailConfig = {
			from: "visums@ecommerce.com",
			to: email,
			subject: mailSubject,
			html: mail,
		}

		try {
			transporter
				.sendMail(mailConfig)
				.then(() => {
					logger.info(`sendMail successfully to ${email}`)
					return "success"
				})
				.catch((err) => {
					throw new Error(err)
				})
		} catch (err) {
			logger.error(err.message)
		}
	}

	static sendVerifyEmail = async ({ OTP, email }) => {
		const encodeVerify = Buffer.from(
			`${OTP}|${email}|verify`,
			"utf-8",
		).toString("base64")
		const emailBody = {
			body: {
				title: "Welcome to Visums eCommerce website",
				name: email,
				intro: [
					"Thank you for register. Use the following OTP to complete your Sign Up procedures.",
					`OTP is valid for 1 days. OTP: ${OTP}`,
					"Or click the following button to finish your register",
				],
				action: {
					button: {
						color: "#48cfad", // Optional action button color
						text: "Confirm your account",
						link: `http://localhost:3000/api/v1/otp/${encodeVerify}`,
					},
				},
				outro: "Need help, or have questions? Just reply to this email, we'd love to help",
			},
		}

		await this.#sendMail({
			emailBody,
			email,
			mailSubject: "Verify OTP for register account",
		})
	}

	static sendReceiptEmail = async ({ order, email }) => {
		const products = order.order_products.flatMap((order) => {
			return order.item_products.flatMap((product) => {
				const { name, price, quantity } = product
				return {
					Quantity: quantity,
					Name: name,
					Price: price,
					"Total price": `${price * quantity} vnđ`,
				}
			})
		})

		const emailBody = {
			body: {
				title: "Thank You.",
				name: email,
				intro: "Your order has been processed successfully.",
				outro: "You can check the status of your order and move in your dashboard: ",
				action: {
					button: {
						color: "#22BC66",
						text: "Going to dashboard",
						link: "#",
					},
				},
				table: {
					title: "Your order information: ",
					data: products,
					columns: {
						customWidth: {
							Quantity: "10%",
							Price: "15%",
							"Total-price": "15%",
						},
					},
				},
			},
		}

		await this.#sendMail({
			emailBody,
			email,
			mailSubject: "Visums Shop order notify",
		})
	}

	static sendForgotEmail = async ({ OTP, email }) => {
		const encodeForgotPass = Buffer.from(
			`${OTP}|${email}|forgot`,
			"utf-8",
		).toString("base64")

		const emailBody = {
			body: {
				title: "Password change request",
				name: email,
				intro: [
					"We've received a password change request for your Visums Shop account.",
					`OTP is valid for 5 minutes. OTP: ${OTP}`,
					"Or click the following button to finish your change password",
				],
				action: {
					button: {
						color: "#48cfad", // Optional action button color
						text: "Change your account password",
						link: `http://localhost:3000/api/v1/otp/${encodeForgotPass}`,
					},
				},
				outro: "Need help, or have questions? Just reply to this email, we'd love to help",
			},
		}

		await this.#sendMail({
			emailBody,
			email,
			mailSubject: "Password change request",
		})
	}
}

module.exports = NodemailerService
