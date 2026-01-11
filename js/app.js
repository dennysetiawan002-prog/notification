const AFFILIATE_URL = "https://shopee.co.id"; // ganti dengan link affiliate kamu

document.addEventListener("DOMContentLoaded", async () => {
  // Jika user sudah pernah isi profil → langsung affiliate
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

    // Minta izin notif hanya 1x
    if (!Storage.getNotifStatus()) {
      await NotificationHelper.init();
      await NotificationHelper.requestPermission();
    }

    redirectToAffiliate();
  }

  genderEl.addEventListener("change", handleChange);
  ageEl.addEventListener("change", handleChange);
});

function redirectToAffiliate() {
  window.location.replace(AFFILIATE_URL);
}
