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
//TODO оповестить при authError
const { t } = useI18n();
const router = useRouter();
const { signUpUser } = useUser();

const emailName = "email",
  passwordName = "password",
  passwordConfigName = "passwordConfig",
  emailPlaceholder = "placeholders.email",
  passwordPlaceholder = "placeholders.password",
  emailType = "email",
  passwordType = "password",
  nameName = "name",
  namePlaceholder = "placeholders.name",
  nameType = "text";

const email = ref<string>(""),
  name = ref<string>(""),
  password = ref<string>(""),
  passwordConf = ref<string>(""),
  avatarFile = ref<File | null>(null);

const isSubmitting = ref<boolean>(false);

const emailError = ref<string>(""),
  nameError = ref<string>(""),
  passwordError = ref<string>(""),
  avatarError = ref<string>("");

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
    router.push("/");
  }

  isSubmitting.value = false;
};
</script>

<template>
  <section>
    <div class="form-container">
      <PreloadSpinner v-if="isSubmitting" class="spinner" />

      <h1>{{ t("common.signUpTitle") }}</h1>
      <form
        @submit.prevent="submitForm"
        :aria-disabled="isSubmitting"
        novalidate
      >
        <div class="input-grup">
          <label :for="nameName">{{ t("labels.nameSign") }}</label>
          <Input
            v-model:model-value="name"
            :name="nameName"
            :id="nameName"
            :placeholder="namePlaceholder"
            :type="nameType"
            :disabled="isSubmitting"
          />
          <p class="error">{{ nameError || "\u00A0" }}</p>
        </div>
        <div class="input-grup">
          <label :for="emailName">{{ t("labels.emailSign") }}</label>
          <Input
            v-model:model-value="email"
            :name="emailName"
            :id="emailName"
            :placeholder="emailPlaceholder"
            :type="emailType"
            :disabled="isSubmitting"
          />
          <p class="error">{{ emailError || "\u00A0"  }}</p>
        </div>
        <div class="input-grup">
          <label :for="passwordName">{{ t("labels.passwordSign") }}</label>
          <Input
            v-model:model-value="password"
            :name="passwordName"
            :id="passwordName"
            :placeholder="passwordPlaceholder"
            :type="passwordType"
            :disabled="isSubmitting"
          />
          <p class="error">{{ passwordError || "\u00A0"  }}</p>
        </div>
        <div class="input-grup">
          <label :for="passwordConf">{{ t("labels.passwordConfirm") }}</label>
          <Input
            v-model:model-value="passwordConf"
            :name="passwordConfigName"
            :id="passwordConfigName"
            :placeholder="passwordPlaceholder"
            :type="passwordType"
            :disabled="isSubmitting"
          />
          <p class="error">{{ passwordError || "\u00A0"  }}</p>
        </div>
        <div class="input-grup">
          <AvatarDropArea
            @upload-avatar="handleAvatarSelect"
            :disabled="isSubmitting"
          />
          <p class="error">{{ avatarError || "\u00A0"  }}</p>
        </div>
        <div class="submit">
          <Button type="submit" :disabled="isSubmitting">{{
            t("buttons.submitSign")
          }}</Button>
        </div>
      </form>
      <Button class="go-back" @click="goBack" :disabled="isSubmitting">{{
        t("buttons.return")
      }}</Button>
    </div>
  </section>
</template>

<style scoped>
.form-container {
  position: relative;
  display: flex;
  flex-direction: column;
}
.submit {
  display: flex;
  justify-content: end;
}
.go-back {
  position: absolute;
  bottom: 0;
}
form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
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
