<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Input from "../shared/Input.vue";
import { ref } from "vue";
import {useSearch} from '../store/search';

const {setSearchTerm} = useSearch();
const { t } = useI18n();

const searchTerm = ref<string>(""),
  searchName = "search",
  searchType = "search",
  searchPlaceholder = "placeholders.searchTasks",
  searchLabele = t('labels.search')

  const onSearch = () => {
    setSearchTerm(searchTerm.value.trim().toLowerCase())
  }
</script>

<template>
  <section>
    <div class="search-form" role="search">
      <label :for="searchName" class="lable-hidden">{{ searchLabele }}</label>
      <Input v-model:model-value="searchTerm"
      :name="searchName"
      :id="searchName"
      :placeholder="searchPlaceholder"
      :type="searchType"
      @input="onSearch" />
    </div>
  </section>
</template>

<style scoped>
.search-form {
  position: relative;
}
.lable-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
