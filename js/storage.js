const Storage = {
  setGender(value) {
    localStorage.setItem("gender", value);
  },

  getGender() {
    return localStorage.getItem("gender");
  },

  setAgeRange(value) {
    localStorage.setItem("age_range", value);
  },

  getAgeRange() {
    return localStorage.getItem("age_range");
  },

  setNotifStatus(value) {
    localStorage.setItem("notif_status", value);
  },

  getNotifStatus() {
    return localStorage.getItem("notif_status");
  },

  hasProfile() {
    return !!(this.getGender() && this.getAgeRange());
  }
};