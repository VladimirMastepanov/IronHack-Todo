<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Button from "../shered/Button.vue";
import LangSwitcher from "./LangSwitcher.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";

const { t } = useI18n();
</script>

<template>
  <section>
    <header>
      <img src="../assets/avatar.jpg" alt="аватар" />
      <ThemeSwitcher />
      <LangSwitcher />

      <Button>{{ t("buttons.logout") }}</Button>
    </header>
  </section>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-xs);
}
img {
  width: 4rem;
  height: auto;
  border-radius: var(--radius-round);
}
p {
  font-weight: var(--font-weight-light);
}
</style>
