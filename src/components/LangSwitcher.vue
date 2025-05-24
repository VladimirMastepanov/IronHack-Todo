<script setup lang="ts">
import { computed } from "vue";
import Button from "../shared/Button.vue";
import { useI18n } from "vue-i18n";
import LangIcon from "../assets/language.svg";

const { locale } = useI18n();

const nextLang = computed<string>(() => (locale.value === "en" ? "es" : "en"));

const toggleLang = (): void => {
  locale.value = nextLang.value;
};
</script>

<template>
  <section>
    <Button @click="toggleLang">
      <LangIcon fill="var(--color-on-secondary)" class="svg" />
    </Button>
  </section>
</template>

<style scoped>
.svg {
  padding: 0;
  height: 1.2em;
  width: auto;
  display: flex;
}
</style>
