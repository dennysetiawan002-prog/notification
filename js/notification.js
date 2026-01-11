const NotificationHelper = {
  async init() {
    if (!("serviceWorker" in navigator) || !("Notification" in window)) {
      Storage.setNotifStatus("denied");
      return false;
    }

    try {
      await navigator.serviceWorker.register("/sw.js");
      return true;
    } catch (e) {
      Storage.setNotifStatus("denied");
      return false;
    }
  },

  async requestPermission() {
    Storage.setNotifStatus("asked");

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      Storage.setNotifStatus("granted");
      return true;
    } else {
      Storage.setNotifStatus("denied");
      return false;
    }
  }
};
