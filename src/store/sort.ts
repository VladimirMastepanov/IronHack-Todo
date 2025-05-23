import { defineStore } from "pinia";
import { ref } from "vue";
import type { SortType } from "../types/types";



export const useSort = defineStore("sort", () => {
  //STATE
  const sortBy = ref<SortType>("none");

  //ACTIONS
  const sortByText = () => (sortBy.value = "text");
  const sortByImportance = () => (sortBy.value = "importance");
  const sortByStatus = () => (sortBy.value = "status");
  const sortByNone = () => (sortBy.value = "none");

  return {
    sortBy,
    sortByText,
    sortByImportance,
    sortByStatus,
    sortByNone,
  };
});
