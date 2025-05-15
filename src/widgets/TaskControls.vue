<script setup lang="ts">
import { ref } from "vue";
import TasksControlButtons from "../components/TasksControlButtons.vue";
import Input from "../shared/Input.vue";

const searchValue = ref<string>("");
const searchPlaceholderText = "placeholders.searchTasks";
</script>

<template>
  <section class="controls">
    <Input
      :placeholder="searchPlaceholderText"
      modelKey="search"
      name="search"
      type="search"
      v-model="searchValue"
    />
    <TasksControlButtons />
  </section>
</template>

<style scoped></style>
