<script setup lang="ts">
import Button from "../shared/Button.vue";
import Input from "../shared/Input.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import AvatarDropArea from "../components/AvatarDropArea.vue";
import { useUser } from "../store/user";
import PreloadSpinner from "../assets/preload.svg";
import {
  isAvatarSizeValid,
  isAvatarTypeValid,
  isEmailValid,
  isNameValid,
  isPassvordLengthValid,
  isPasswordMarch,
} from "../features/handleFormCheck";
import { storeToRefs } from "pinia";
//TODO оповестить при authError
const { t } = useI18n();
const router = useRouter();
const userStore = useUser();
const { user } = storeToRefs(userStore);
const { signUpUser } = userStore;

const emailName = "email",
  passwordName = "password",
  emailPlaceholder = "placeholders.email",
  passwordPlaceholder = "placeholders.password",
  emailType = "email",
  passwordType = "password",
  nameName = "name",
  namePlaceholder = "placeholders.name",
  nameType = "text";

const email = ref<string>("");
const name = ref<string>("");
const password = ref<string>("");
const passwordConf = ref<string>("");
const avatarFile = ref<File | null>(null);

const isSubmitting = ref<boolean>(false);

const emailError = ref<string>("");
const nameError = ref<string>("");
const passwordError = ref<string>("");
const avatarError = ref<string>("");

const goBack = (): void => {
  router.push("/auth");
};

const handleAvatarSelect = (file: File): void => {
  avatarFile.value = file;
};

const submitForm = async () => {
  isSubmitting.value = true;
  emailError.value = "";
  passwordError.value = "";
  nameError.value = "";
  avatarError.value = "";

  passwordError.value = isPasswordMarch(password.value, passwordConf.value)
    ? ""
    : t("errors.passwordsDontMatch");
  passwordError.value = isPassvordLengthValid(
    password.value,
    passwordConf.value
  )
    ? ""
    : t("errors.invalidPassword");
  emailError.value = isEmailValid(email.value) ? "" : t("errors.invalidEmail");
  nameError.value = isNameValid(name.value) ? "" : t("errors.invalidName");
  if (avatarFile.value) {
    if (!isAvatarSizeValid(avatarFile.value)) {
      avatarError.value = t("errors.avatarTooLarge");
    } else if (!isAvatarTypeValid(avatarFile.value)) {
      avatarError.value = t("errors.avatarInvalidType");
    }
  }

  if (
    !avatarError.value &&
    !passwordError.value &&
    !emailError.value &&
    !nameError.value
  ) {
    await signUpUser(name.value, email.value, password.value, avatarFile.value);
  }

  isSubmitting.value = false;
  console.log(user);
  router.push("/");
};
</script>

<template>
  <section>
    <div class="form-container">
      <PreloadSpinner v-if="isSubmitting" class="spinner" />

      <h1>{{ t("common.signUpTitle") }}</h1>
      <form @submit.prevent="submitForm" :aria-disabled="isSubmitting">
        <div class="input-grup">
          <label :for="nameName">{{ t("labels.nameSign") }}</label>
          <Input
            v-model:model-value="name"
            :name="nameName"
            :placeholder="namePlaceholder"
            :type="nameType"
            :disabled="isSubmitting"
          />
          <p class="error">{{ nameError }}</p>
        </div>
        <div class="input-grup">
          <label :for="emailName">{{ t("labels.emailSign") }}</label>
          <Input
            v-model:model-value="email"
            :name="emailName"
            :placeholder="emailPlaceholder"
            :type="emailType"
            :disabled="isSubmitting"
          />
          <p class="error">{{ emailError }}</p>
        </div>
        <div class="input-grup">
          <label :for="passwordName">{{ t("labels.passwordSign") }}</label>
          <Input
            v-model:model-value="password"
            :name="passwordName"
            :placeholder="passwordPlaceholder"
            :type="passwordType"
            :disabled="isSubmitting"
          />
          <p class="error">{{ passwordError }}</p>
        </div>
        <div class="input-grup">
          <label :for="passwordConf">{{ t("labels.passwordConfirm") }}</label>
          <Input
            v-model:model-value="passwordConf"
            :name="passwordName"
            :placeholder="passwordPlaceholder"
            :type="passwordType"
            :disabled="isSubmitting"
          />
          <p class="error">{{ passwordError }}</p>
        </div>
        <div class="input-grup">
          <AvatarDropArea
            @upload-avatar="handleAvatarSelect"
            :disabled="isSubmitting"
          />
          <p class="error">{{ avatarError }}</p>
        </div>
        <div>
          <Button type="submit" :disabled="isSubmitting">{{
            t("buttons.submitSign")
          }}</Button>
        </div>
      </form>
      <Button @click="goBack">{{ t("buttons.return") }}</Button>
    </div>
  </section>
</template>

<style scoped>
.form-container {
  position: relative;
}
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: var(--space-3xl);
  width: auto;
}
.error {
  color: var(--color-error-container);
  font-size: 0.7em;
  text-align: left;
  padding: 0 0 0 var(--space-md);
}
</style>
