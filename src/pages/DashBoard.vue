<script setup lang="ts">
import TasksList from "../widgets/TasksList.vue";
import TaskControls from "../widgets/TaskControls.vue";
</script>

<template>
  <section >
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
