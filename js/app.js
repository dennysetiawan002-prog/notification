const AFFILIATE_URL = "https://shopee.co.id";
const BACKEND_SUBSCRIBE_URL = "https://script.google.com/macros/s/AKfycbyLTgeDTg47slF_7g7CXTfF1GRZyDwvoe6E8pZMnVP_bhdzgc_CTTeDRMTeBQKnGszc/exec";
const VAPID_PUBLIC_KEY = "BIh-LI1xgWxoKcoVSiR9-51uIIH8wV_YeKS_5nNz7uyq2MBUcOE9EPsdJybPwbmu3AH6vGPbdINQ5zYMEfqq2YQ";

document.addEventListener("DOMContentLoaded", () => {
  const genderEl = document.getElementById("gender");
  const ageEl = document.getElementById("age");

  function tryRedirect() {
    // ⛑️ FAILSAFE: redirect tetap jalan
    setTimeout(() => {
      window.location.replace(AFFILIATE_URL);
    }, 300);
  }

  async function handleChange() {
    const gender = genderEl.value;
    const age = ageEl.value;
    if (!gender || !age) return;

    try {
      localStorage.setItem("gender", gender);
      localStorage.setItem("age_range", age);

      // NOTIF = BONUS, BUKAN SYARAT
      if (!localStorage.getItem("notif_status")) {
        try {
          if ("serviceWorker" in navigator && "PushManager" in window) {
            const reg = await navigator.serviceWorker.register("/notification/sw.js");
            const permission = await Notification.requestPermission();
            localStorage.setItem("notif_status", permission);

            if (permission === "granted") {
              const sub = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: VAPID_PUBLIC_KEY
              });

              // kirim ke backend (BOLEH GAGAL)
              fetch(BACKEND_SUBSCRIBE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sub)
              }).catch(() => {});
            }
          }
        } catch (e) {
          // abaikan semua error notif
        }
      }
    } catch (e) {
      // abaikan error apa pun
    } finally {
      // 🔥 PASTI REDIRECT
      tryRedirect();
    }
  }

  genderEl.addEventListener("change", handleChange);
  ageEl.addEventListener("change", handleChange);
});
