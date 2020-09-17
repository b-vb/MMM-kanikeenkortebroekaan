Module.register("MMM-kanikeenkortebroekaan", {
  // Default module config.
  defaults: {
    refreshInterval: "5000" // 30 minutes
  },

  start: function () {
    this.imageSrc = "";
    this.sendSocketNotification("UPDATE_PLEASE");
  },

  // Override dom generator.
  getDom: function () {
    var image = document.createElement("IMG");
    image.setAttribute("src", this.imageSrc);
    image.setAttribute("style", "filter: grayscale(100%); contrast(200%)");
    image.setAttribute("width", "200em");
    image.id = "SHORTS_IMAGE";
    return image;
  },

  notificationReceived: function (notification) {
    switch (notification) {
      case "DOM_OBJECTS_CREATED":
        setInterval(() => {
          this.sendSocketNotification("UPDATE_PLEASE");
        }, this.config.refreshInterval);
        break;
    }
  },

  socketNotificationReceived: function (notification, { imageSrc }) {
    switch (notification) {
      case "ANSWER":
        this.imageSrc = imageSrc;
        this.updateDom();
        break;
    }
  }
});
