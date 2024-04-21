const { Types } = require("mongoose")
const { userLogin } = require("../index")

const seedUserLogin = async () => {
	await userLogin.collection.drop()
	await userLogin.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a48"),
		local: {
			email: "admin@gmail.com",
			password:
				"$2b$10$/jT3XHMsHMiof3wZfT2vH.efRcZOH3/7jGOi5RGEcsQJGGBzh40bi",
		},
		role: "0003",
		verified: true,
		token: "38e51522-0fee-44fd-84bb-c3db5ef1c56e",
	})
	await userLogin.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a4a"),
		local: {
			email: "shop@gmail.com",
			password:
				"$2b$10$/jT3XHMsHMiof3wZfT2vH.efRcZOH3/7jGOi5RGEcsQJGGBzh40bi",
		},
		role: "0002",
		verified: true,
		token: "31e51522-0fee-44fd-84bb-c3db5ef1c56e",
	})
	await userLogin.create({
		_id: new Types.ObjectId("65f7ec34086229fc88e93a4c"),
		local: {
			email: "user@gmail.com",
			password:
				"$2b$10$/jT3XHMsHMiof3wZfT2vH.efRcZOH3/7jGOi5RGEcsQJGGBzh40bi",
		},
		role: "0001",
		verified: true,
		token: "38f51522-0fee-44fd-84bb-c3db5ef1c56e",
	})
}

module.exports = seedUserLogin
