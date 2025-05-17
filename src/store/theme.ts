import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  //STATE
  const isLightTheme = ref<boolean>(false);

  //ACTIONS
  const applyTheme = () => {
    if (isLightTheme.value) {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  };

  const toggleTheme = () => {
    isLightTheme.value = !isLightTheme.value;
    applyTheme();
    localStorage.setItem("theme", isLightTheme.value ? "light" : "dark");
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      isLightTheme.value = savedTheme === "light";
    } else {
      const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      isLightTheme.value = prefersLight;
    }
    applyTheme();
  };

  return {
    isLightTheme,
    applyTheme,
    toggleTheme,
    initTheme,
  };
});
