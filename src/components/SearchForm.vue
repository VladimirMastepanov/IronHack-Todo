<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t} = useI18n()

</script>

<template>
  <section class="search-form">

    <input type="search" :placeholder="t('placeholders.searchTasks')" />

  </section>
</template>

<style scoped>
.search-form {
  display: flex;
  justify-content: center;
  flex-direction: column;

  background-color: var(--color-tertiary);
  height: 100%;
  width: 100%;
  /* border-radius: var(--radius-md) var(--radius-md) 0px 0px; */
  border-radius: var(--radius-md);
  padding-top: var(--space-sm);
  z-index: 1;
}

input {
  all: unset;
  padding: var(--space-sm) var(--space-md);
  /* width: 100%; */
  text-align: left;
  background-color: red;
  background-color: var(--color-tertiary);
  border: 1px var(--color-outline) solid;
  border-radius: var(--radius-lg);
  color: var(--color-on-tertiary);
  font-size: var(--font-size-md);
  margin-left: var(--space-md);
  margin-right: var(--space-md);
}
</style>
