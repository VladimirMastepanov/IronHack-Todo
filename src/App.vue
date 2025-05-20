<script setup lang="ts">
import Header from "./widgets/Header.vue";
</script>

<template>
  <Header />
  <main>
    <router-view />
  </main>
</template>

<style scoped>
main {
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: var(--radius-md);
  background-color: var(--color-tertiary);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  padding: var(--space-sm);
  padding-bottom: var(--space-xl);
}
</style>
