<script setup lang="ts">
import TasksControlButtons from './TasksControlButtons.vue'

import TaskSearch from './TaskSearch.vue'
</script>

<template>
  <section class="controls">
    <TaskSearch />
    <TasksControlButtons />
  </section>
</template>

<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
</style>
