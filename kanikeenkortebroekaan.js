Module.register("kanikeenkortebroekaan", {
	// Default module config.
	defaults: {
		refreshInterval: "2000" // 10 seconds
	},

	// Override dom generator.
	getDom: function () {
		var image = document.createElement("IMG");
		// image.setAttribute("src", `https://www.kanikeenkortebroekaan.nl/assets/${this.config.outcome}-man.png`);
		image.setAttribute("style", "filter: grayscale(100%); contrast(200%)");
		image.setAttribute("width", "200em");
		image.id = "SHORTS_IMAGE";
		return image;
	},

	notificationReceived: function (notification) {
		switch (notification) {
			case "DOM_OBJECTS_CREATED":
				console.log("DOM_CREATED");
				setInterval(() => {
					this.sendSocketNotification("UPDATE_PLEASE");
					this.count++;
				}, this.config.refreshInterval);
				break;
		}
	},

	socketNotificationReceived: function (notification, { imageSrc }) {
		switch (notification) {
			case "ANSWER":
				var image = document.getElementById("SHORTS_IMAGE");
				image.setAttribute("src", imageSrc);
				break;
		}
	}
});
