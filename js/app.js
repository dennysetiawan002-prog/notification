const AFFILIATE_URL = "https://shopee.co.id"; // ganti nanti dengan link affiliate

document.addEventListener("DOMContentLoaded", () => {
  // Jika user sudah pernah isi profil → langsung affiliate
  if (Storage.hasProfile()) {
    redirectToAffiliate();
    return;
  }

  const genderEl = document.getElementById("gender");
  const ageEl = document.getElementById("age");

  function handleChange() {
    const gender = genderEl.value;
    const age = ageEl.value;

    if (!gender || !age) return;

    Storage.setGender(gender);
    Storage.setAgeRange(age);

    redirectToAffiliate();
  }

  genderEl.addEventListener("change", handleChange);
  ageEl.addEventListener("change", handleChange);
});

function redirectToAffiliate() {
  window.location.replace(AFFILIATE_URL);
}
