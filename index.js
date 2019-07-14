'use strict';

const Discord = require("discord.js");
const fetch = require('node-fetch');

const client = new Discord.Client();

let currencyResult;

client.on('ready', () => {
	console.log("Connected as " + client.user.tag);
	client.user.setActivity("JavaScript");
});

fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
		let usdCcy = data[0];
		let rubCcy = data[2];
		let usdArr = usdCcy.ccy + ' ' + usdCcy.buy;
		let rubArr = rubCcy.ccy + ' ' + rubCcy.buy;
		currencyResult = ':thinking:' + '\n' + ':flag_us:' + ' ' + usdArr + '\n' + ':flag_ru:' + ' ' + rubArr;
	});

client.on("message", (message) => {
	if (message.content.startsWith("ping")) {
		message.channel.send(currencyResult);
	}
});

client.login(process.env.token);
