// ================= CONFIG =================
const AFFILIATE_URL = "https://shopee.co.id";

// URL Web App Google Apps Script (doPost)
const BACKEND_SUBSCRIBE_URL = "https://script.google.com/macros/s/AKfycbyLTgeDTg47slF_7g7CXTfF1GRZyDwvoe6E8pZMnVP_bhdzgc_CTTeDRMTeBQKnGszc/exec";

// VAPID PUBLIC KEY
const VAPID_PUBLIC_KEY = "BIh-LI1xgWxoKcoVSiR9-51uIIH8wV_YeKS_5nNz7uyq2MBUcOE9EPsdJybPwbmu3AH6vGPbdINQ5zYMEfqq2YQ";

// Path service worker (repo = notification)
const SW_PATH = "/notification/sw.js";
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // ===== AUTO SKIP JIKA SUDAH PERNAH ISI =====
  const savedGender = localStorage.getItem("gender");
  const savedAge = localStorage.getItem("age_range");

  if (savedGender && savedAge) {
    window.location.replace(AFFILIATE_URL);
    return;
  }

  const genderEl = document.getElementById("gender");
  const ageEl = document.getElementById("age");
  const btn = document.getElementById("saveBtn");

  function toggleBtn() {
    btn.disabled = !(genderEl.value && ageEl.value);
  }

  genderEl.addEventListener("change", toggleBtn);
  ageEl.addEventListener("change", toggleBtn);

  btn.addEventListener("click", async () => {
    // 1. Simpan profil
    localStorage.setItem("gender", genderEl.value);
    localStorage.setItem("age_range", ageEl.value);

    // 2. Minta izin notif (HARUS via klik)
    try {
      if (!localStorage.getItem("notif_status")) {
        if ("serviceWorker" in navigator && "Notification" in window) {
          const reg = await navigator.serviceWorker.register(SW_PATH);
          const permission = await Notification.requestPermission();
          localStorage.setItem("notif_status", permission);

          // 3. Jika diizinkan, simpan subscription ke backend
          if (permission === "granted") {
            const sub = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: VAPID_PUBLIC_KEY
            });

            // Kirim ke Apps Script (boleh gagal, tidak menghalangi redirect)
            fetch(BACKEND_SUBSCRIBE_URL, {
  method: "POST",
  headers: { "Content-Type": "text/plain" },
  body: JSON.stringify(sub)
}).catch(() => {});

          }
        }
      }
    } catch (e) {
      // sengaja dikosongkan (notif = bonus)
    } finally {
      // 4. REDIRECT WAJIB JALAN
      window.location.replace(AFFILIATE_URL);
    }
  });
});

