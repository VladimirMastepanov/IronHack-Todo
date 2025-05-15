<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Button from "../shered/Button.vue";
import LangSwitcher from "../components/LangSwitcher.vue";
import ThemeSwitcher from "../components/ThemeSwitcher.vue";
import { computed, ref } from "vue";

const { t } = useI18n();
const router = useRouter();
const userId = ref<string>("");
const isAuth = ref<boolean>(true);

const login = ():void => {
  //store action
  //check sucsesful
  router.push(`/dashboard/${userId.value}`);
};

const logout = ():void => {
  //change store
  localStorage.removeItem("auth");
  router.push("/auth");
};

const handleClick = ():void => {
  if (isAuth.value) {
    logout();
  } else {
    login();
  }
};

const buttonText = computed(() =>
  isAuth.value ? t("buttons.logout") : t("buttons.login")
);
</script>

<template>
  <section>
    <header>
      <img src="../assets/thin/account_circle.svg" :alt="t('common.avatarAlt')" />
      <ThemeSwitcher />
      <LangSwitcher />

      <Button @click="handleClick">{{ buttonText }}</Button>
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
