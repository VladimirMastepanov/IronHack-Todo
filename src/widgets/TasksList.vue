<script setup lang="ts"></script>

<template>
  <section class="tasks-list">
    <ul>
      <li>task</li>
      <li>task</li>
      <li>task</li>
      <li>task</li>
    </ul>
  </section>
</template>

<style scoped>
.tasks-list {
  width: 100%;
  height: 100%;
  z-index: 2;
  margin-top: var(--space-xl);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
}
</style>
