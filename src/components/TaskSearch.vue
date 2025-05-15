<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const searchPlaceholder = t('placeholders.search')

</script>

<template>
  <section class="search-form">
    <input type="search" :placeholder="searchPlaceholder" />
  </section>
</template>

<style scoped>
.search-form {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-md);
  padding: var(--space-sm);

}

input {
  all: unset;
  padding: var(--space-xs) var(--space-xs) var(--space-xs) var(--space-md);
  text-align: left;
  background-color: var(--color-tertiary);
  border: 1px var(--color-outline) solid;
  border-radius: var(--radius-lg);
  color: var(--color-on-tertiary);
  font-size: var(--font-size-md);
}

</style>


