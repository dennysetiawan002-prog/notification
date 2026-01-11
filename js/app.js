// ================= CONFIG =================
const AFFILIATE_URL = "https://shopee.co.id";


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

  btn.addEventListener("click", () => {
  // 1. Simpan profil
  localStorage.setItem("gender", genderEl.value);
  localStorage.setItem("age_range", ageEl.value);

  // 2. Munculkan izin notifikasi OneSignal (via klik user)
  if (window.OneSignalDeferred) {
    OneSignalDeferred.push(function (OneSignal) {
      OneSignal.showSlidedownPrompt();
    });
  }

  // 3. Redirect setelah popup muncul
  setTimeout(() => {
    window.location.replace(AFFILIATE_URL);
  }, 1200);
});

