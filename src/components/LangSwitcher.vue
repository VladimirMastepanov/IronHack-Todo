<script setup lang="ts">
import { computed } from "vue";
import Button from "../shared/Button.vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const nextLang = computed<string>(() => (locale.value === "en" ? "es" : "en"));

const toggleLang = (): void => {
  locale.value = nextLang.value;
};

</script>

<template>
  <section>
    <Button @click="toggleLang">{{ nextLang }}</Button>
  </section>
</template>

<style scoped></style>
