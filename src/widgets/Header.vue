<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Button from "../shared/Button.vue";
import LangSwitcher from "../components/LangSwitcher.vue";
import ThemeSwitcher from "../components/ThemeSwitcher.vue";
import { ref } from "vue";

const { t } = useI18n();
const router = useRouter();
// const userId = ref<string>("");
const isAuth = ref<boolean>(true);
const isSubmitting = ref<boolean>(false);

const logout = ():void => {
  //change store
  localStorage.removeItem("auth");
  router.push("/auth");
};


</script>

<template>
  <section>
    <header>
      <img src="../assets/thin/account_circle.svg" :alt="t('common.avatarAlt')" />
      <ThemeSwitcher />
      <LangSwitcher />

      <Button v-if="isAuth" @click="logout" :disabled="isSubmitting">{{ t("buttons.logout") }}</Button>
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
