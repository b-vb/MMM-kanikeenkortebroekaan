const NodeHelper = require("node_helper");
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = NodeHelper.create({
	start: function () {
		this.answer = { text: "Geen idee", imageSrc: null };
	},
	socketNotificationReceived: function (notification) {
		switch (notification) {
			case "UPDATE_PLEASE":
				axios
					.get("https://www.kanikeenkortebroekaan.nl/", { timeout: 5000 })
					.then(({ data }) => {
						const dom = new JSDOM(data);
						this.answer.text = dom.window.document.body.className;
						this.answer.imageSrc = `https://www.kanikeenkortebroekaan.nl/assets/${this.answer.text === "ja" ? "yes" : "no"}-man.png`;
						console.log("Kan ik een korte broek aan vandaag? ", this.answer);
						this.sendSocketNotification("ANSWER", this.answer);
					})
					.catch((error) => console.log("Error while fetching kanikeenkortebroekaan.nl", error));
				break;
		}
	}
});
