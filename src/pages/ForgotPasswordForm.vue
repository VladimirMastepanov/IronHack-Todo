<script setup lang="ts">
import Button from "../shared/Button.vue";
import Input from "../shared/Input.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
//TODO
const { t } = useI18n();
const router = useRouter();

const emailName = "email",
  emailPlaceholder = "placeholders.email",
  emailType = "email",
  emailConfirmationInputId = 'email-confirmation-input';

const email = ref("");

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
          <label :for="emailConfirmationInputId">{{ t("lables.emailLogin") }}</label>
          <Input
            v-model:model-value="email"
            :name="emailName"
            :placeholder="emailPlaceholder"
            :type="emailType"
            :id="emailConfirmationInputId"
          />
          <p>{{ email }}</p>
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
