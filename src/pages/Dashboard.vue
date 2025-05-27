<script setup lang="ts">
import TasksList from '../components/TasksList.vue'
import TaskControls from '../components/TaskControls.vue'
</script>

<template>
  <section>
    <TaskControls />
    <TasksList />
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>
