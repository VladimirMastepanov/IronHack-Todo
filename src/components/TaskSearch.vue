<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Input from "../shared/Input.vue";
import { ref } from "vue";
const { t } = useI18n();

const serchTerm = ref<string>(""),
  searchName = "search",
  searchType = "search",
  searchPlaceholder = "placeholders.searchTasks",
  searchLabele = t('') //TODO

  const onSearch = () => {} //TODO
</script>

<template>
  <section>
    <div class="search-form" role="search">
      <label :for="searchName" class="lable-hidden">{{ searchLabele }}</label>
      <Input v-model:model-value="serchTerm"
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
