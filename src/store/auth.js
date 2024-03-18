import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: localStorage.getItem('token') ? true : false,
    user: localStorage.getItem('name'),
  }),
  actions: {
    setLoginStatus(status) {
      this.isLoggedIn = status;
    },
  },
});
