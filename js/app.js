const AFFILIATE_URL = "https://shopee.co.id";

document.addEventListener("DOMContentLoaded", () => {
    // CEK: apakah user sudah pernah isi
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
    localStorage.setItem("gender", genderEl.value);
    localStorage.setItem("age_range", ageEl.value);

    // trigger izin notifikasi OneSignal (jika ada)
    if (window.OneSignalDeferred) {
      OneSignalDeferred.push(function (OneSignal) {
        OneSignal.showNativePrompt();
      });
    }

    setTimeout(() => {
      window.location.replace(AFFILIATE_URL);
    }, 1200);
  });
});
