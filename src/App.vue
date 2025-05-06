<script setup lang="ts">
import Header from "./components/Header.vue";
import SearchForm from "./components/SearchForm.vue";
import TasksList from "./components/TasksList.vue";
</script>

<template>
  <Header />
  <main>
    <SearchForm />

    <TasksList />
  </main>
</template>

<style scoped>
main {
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: var(--radius-md);
  background-color: var(--color-on-tertiary);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  height: 100%;
  width: 100%;
  margin-top: var(--space-md);
}
</style>
