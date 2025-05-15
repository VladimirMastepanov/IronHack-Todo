<script setup lang="ts">
import Button from "../shared/Button.vue";
import Input from "../shared/Input.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import AvatarDropArea from "../components/AvatarDropArea.vue";

const { t } = useI18n();
const router = useRouter();

const emailName = "email",
  passwordName = "password",
  emailPlaceholder = "placeholders.email",
  passwordPlaceholder = "placeholders.password",
  emailType = "email",
  passwordType = "password";

const email = ref<string>("");
const password = ref<string>("");
const passwordConf = ref<string>("");
const avatarFile = ref<File | null>(null);

const goBack = (): void => {
  router.push("/auth");
};

const handleAvatarSelect = (file: File): void => {
  avatarFile.value = file;
};

const submitForm = () => {};
</script>

<template>
  <section>
    <div class="">
      <h1>{{ t("common.signUpTitle") }}</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label :for="emailName">{{ t("lables.emailSign") }}</label>
          <Input
            v-model:model-value="email"
            :name="emailName"
            :placeholder="emailPlaceholder"
            :type="emailType"
          />
          <p>{{ email }}</p>
        </div>
        <div>
          <label :for="passwordName">{{ t("lables.passwordSign") }}</label>
          <Input
            v-model:model-value="password"
            :name="passwordName"
            :placeholder="passwordPlaceholder"
            :type="passwordType"
          />
          <p>{{ password }}</p>
        </div>
        <div>
          <label :for="passwordConf">{{ t("lables.passwordConfirm") }}</label>
          <Input
            v-model:model-value="passwordConf"
            :name="passwordName"
            :placeholder="passwordPlaceholder"
            :type="passwordType"
          />
          <p>{{ passwordConf }}</p>
        </div>
        <div>
          <AvatarDropArea @upload-avatar="handleAvatarSelect" />
        </div>
        <div>
          <Button>{{ t("buttons.submitSign") }}</Button>
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
