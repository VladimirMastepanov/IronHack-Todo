import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isLightTheme: false,
  }),

  actions: {
    toggleTheme() {
      this.isLightTheme = !this.isLightTheme;
      this.applyTheme();
      localStorage.setItem("theme", this.isLightTheme ? "light" : "dark");
    },
    initTheme() {
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme) {
        this.isLightTheme = savedTheme === "light";
      } else {
        const prefersLight = window.matchMedia(
          "(preferes-color-scheme: light)"
        ).matches;
        this.isLightTheme = prefersLight;
      }
      this.applyTheme();
    },
    applyTheme() {
      if (this.isLightTheme) {
        document.documentElement.classList.add("light-theme");
      } else {
        document.documentElement.classList.remove("light-theme");
      }
    },
  },
});
