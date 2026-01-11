const AFFILIATE_URL = "https://shopee.co.id";

// GANTI DARI APPS SCRIPT
const BACKEND_SUBSCRIBE_URL = "https://script.google.com/macros/s/AKfycbyLTgeDTg47slF_7g7CXTfF1GRZyDwvoe6E8pZMnVP_bhdzgc_CTTeDRMTeBQKnGszc/exec";
const VAPID_PUBLIC_KEY = "BIh-LI1xgWxoKcoVSiR9-51uIIH8wV_YeKS_5nNz7uyq2MBUcOE9EPsdJybPwbmu3AH6vGPbdINQ5zYMEfqq2YQ";

document.addEventListener("DOMContentLoaded", async () => {
  if (Storage.hasProfile()) {
    redirectToAffiliate();
    return;
  }

  const genderEl = document.getElementById("gender");
  const ageEl = document.getElementById("age");

  async function handleChange() {
    const gender = genderEl.value;
    const age = ageEl.value;
    if (!gender || !age) return;

    Storage.setGender(gender);
    Storage.setAgeRange(age);

    if (!Storage.getNotifStatus()) {
      const reg = await NotificationHelper.init();
      if (reg) {
        await NotificationHelper.subscribeAndSend(reg);
      }
    }

    redirectToAffiliate();
  }

  genderEl.addEventListener("change", handleChange);
  ageEl.addEventListener("change", handleChange);
});

function redirectToAffiliate() {
  window.location.replace(AFFILIATE_URL);
}
