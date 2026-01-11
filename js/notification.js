const NotificationHelper = {
  async init() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      Storage.setNotifStatus("denied");
      return null;
    }

    const reg = await navigator.serviceWorker.register("/sw.js");
    return reg;
  },

  async subscribeAndSend(reg) {
    const permission = await Notification.requestPermission();
    Storage.setNotifStatus(permission === "granted" ? "granted" : "denied");

    if (permission !== "granted") return;

    // subscribe push
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY
    });

    // kirim ke backend
    await fetch(BACKEND_SUBSCRIBE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription)
    });
  }
};
