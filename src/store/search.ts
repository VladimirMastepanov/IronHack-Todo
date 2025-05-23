import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearch = defineStore("search", () => {
  //STATE
  const searchTerm = ref<string>("");

  //ACTIONS
  const setSearchTerm = (str: string) => {
    searchTerm.value = str;
  };

  return {
    searchTerm,
    setSearchTerm,
  };
});
