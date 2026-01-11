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

  btn.addEventListener("click", async () => {
    // 1. Simpan profil
    localStorage.setItem("gender", genderEl.value);
    localStorage.setItem("age_range", ageEl.value);

    // 2. Minta izin notif (HARUS via klik)
    try {
      if (!localStorage.getItem("notif_status")) {
        
      }
    } catch (e) {
      // sengaja dikosongkan (notif = bonus)
    } finally {
      // 4. REDIRECT WAJIB JALAN
      window.location.replace(AFFILIATE_URL);
    }
  });
});

