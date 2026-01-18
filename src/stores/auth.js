import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    auth: false,
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
      this.auth = true;
    },
    logout() {
      this.user = null;
      this.auth = false;
    },
  },
});
