self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  self.clients.claim();
});

// 🔔 INI BAGIAN PENTING
self.addEventListener("push", event => {
  if (!event.data) return;

  const data = event.data.json();

  const options = {
    body: data.body || "",
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg",
    badge: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg",
    data: {
      url: data.url
    }
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || "Promo Terbaru",
      options
    )
  );
});

// 👉 Saat notif diklik
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const url = event.notification.data?.url || "https://shopee.co.id";
  event.waitUntil(
    clients.openWindow(url)
  );
});
