<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Button from "../shared/Button.vue";
import LangSwitcher from "../components/LangSwitcher.vue";
import ThemeSwitcher from "../components/ThemeSwitcher.vue";
import { ref } from "vue";
import { useUser } from "../store/user";
import DefaultAvatar from "../assets/thin/account_circle.svg";
import { storeToRefs } from "pinia";
import { computed } from "vue";
//TODO check display default avatar
const { t } = useI18n();
const router = useRouter();
const userStore = useUser();
const { isAuth, user } = storeToRefs(userStore);
const { logOutUser } = userStore;
const isSubmitting = ref<boolean>(false);
const avataeUrl = computed(() => user.value?.image || DefaultAvatar);

const logout = async (): Promise<void> => {
  try {
    isSubmitting.value = true;
    await logOutUser();
    router.push("/auth");
  } catch (err) {
    console.error("logout error:", err);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section>
    <header>
      <img :src="avataeUrl" :alt="t('common.avatarAlt')" />
      <ThemeSwitcher />
      <LangSwitcher />

      <Button v-if="isAuth" @click="logout" :disabled="isSubmitting">{{
        t("buttons.logout")
      }}</Button>
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
  object-fit: cover;
}
p {
  font-weight: var(--font-weight-light);
}
</style>
