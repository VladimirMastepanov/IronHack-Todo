<script setup lang="ts">
import Button from "../shared/Button.vue";
import Input from "../shared/Input.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const emailName = "email",
  passwordName = "password",
  emailPlaceholder = "placeholders.email",
  passwordPlaceholder = "placeholders.password",
  emailType = "email",
  passwordType = "password";

const email = ref("");
const password = ref("");

const goBack = () => {
  router.push("/auth");
};

const submitForm = () => {};
</script>

<template>
  <section>
    <div class="">
      <h1>{{ t("common.loginTitle") }}</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label :for="emailName">{{ t("lables.emailLogin") }}</label>
          <Input
            v-model:model-value="email"
            :name="emailName"
            :placeholder="emailPlaceholder"
            :type="emailType"
          />
          <p>{{ email }}</p>
        </div>
        <div>
          <label :for="passwordName">{{ t("lables.passwordLogin") }}</label>
          <Input
            v-model:model-value="password"
            :name="passwordName"
            :placeholder="passwordPlaceholder"
            :type="passwordType"
          />
          <p>{{ password }}</p>
        </div>
        <div>
          <Button>{{ t("buttons.submitLogin") }}</Button>
        </div>
      </form>
      <Button @click="goBack">{{ t("buttons.return") }}</Button>
    </div>
  </section>
</template>

<style scoped>
.auth-main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  padding: var(--space-md);
  gap: var(--space-md);
}
.auth-main div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
