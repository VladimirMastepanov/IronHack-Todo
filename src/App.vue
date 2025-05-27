<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <div class="layout">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  gap: var(--space-md);
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1 1 auto;
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: var(--radius-md);
  background-color: var(--color-surface-bright);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  padding: var(--space-sm);
  padding-bottom: var(--space-xl);
  margin-bottom: var(--space-2xl);
}
</style>
