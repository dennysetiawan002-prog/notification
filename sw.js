self.addEventListener("push", function (event) {
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {}

  const title = data.title || "Promo Shopee";
  const options = {
    body: data.body || "Cek promo terbaru hari ini",
    icon: "/assets/shopee.png",
    badge: "/assets/shopee.png",
    data: {
      url: data.url || "https://shopee.co.id"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const target = event.notification.data.url;
  event.waitUntil(
    clients.openWindow(target)
  );
});
