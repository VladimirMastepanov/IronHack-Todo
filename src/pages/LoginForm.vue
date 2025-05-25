<script setup lang="ts">
import Button from "../shared/Button.vue";
import Input from "../shared/Input.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useUser } from "../store/user";
import {
  isEmailValid,
  isPassvordLengthValid,
} from "../features/handleFormCheck";
import PreloadSpinner from "../assets/preload.svg";

const { t } = useI18n();
const router = useRouter();
const { loginUser } = useUser();

const emailName = "emailLogin",
  passwordName = "passwordLogin",
  emailPlaceholder = "placeholders.email",
  passwordPlaceholder = "placeholders.password",
  emailType = "email",
  passwordType = "password";

const email = ref<string>(""),
  password = ref<string>("");

const isSubmitting = ref<boolean>(false);

const emailError = ref<string>(""),
  passwordError = ref<string>("");

const goBack = (): void => {
  router.push("/auth");
};

const forgotPassword = (): void => {
  router.push("/forgotpassword");
};

const submitForm = async () => {
  isSubmitting.value = true;
  emailError.value = "";
  passwordError.value = "";

  emailError.value = isEmailValid(email.value) ? "" : t("errors.invalidEmail");
  passwordError.value = isPassvordLengthValid(password.value)
    ? ""
    : t("errors.invalidPassword");

  if (!emailError.value && !passwordError.value) {
    await loginUser(email.value, password.value);

    router.push("/");
  }
  isSubmitting.value = false;
};
</script>

<template>
  <section>
    <div class="form-container">
      <PreloadSpinner v-if="isSubmitting" class="spinner" />
      <h1>{{ t("common.loginTitle") }}</h1>
      <form
        @submit.prevent="submitForm"
        :aria-disabled="isSubmitting"
        novalidate
        >
        <div>
          <label :for="emailName">{{ t("labels.emailLogin") }}</label>
          <Input
            v-model:model-value="email"
            :name="emailName"
            :id="emailName"
            :placeholder="emailPlaceholder"
            :type="emailType"
            :disabled="isSubmitting"
          />
          <p class="error">{{ emailError || "\u00A0" }}</p>
        </div>
        <div>
          <label :for="passwordName">{{ t("labels.passwordLogin") }}</label>
          <Input
            v-model:model-value="password"
            :name="passwordName"
            :id="passwordName"
            :placeholder="passwordPlaceholder"
            :type="passwordType"
            :disabled="isSubmitting"
          />
          <p class="error">{{ passwordError || "\u00A0" }}</p>
          <button @click="forgotPassword" :disabled="isSubmitting">{{ t("buttons.forgotPassword") }}</button>
        </div>
        <div class="send">
          <Button type="submit" :disabled="isSubmitting">{{
            t("buttons.submitLogin")
          }}</Button>
        </div>
      </form>
      <div class="go-back">
              <Button @click="goBack" :disabled="isSubmitting">{{
        t("buttons.return")
      }}</Button>
      </div>


    </div>
  </section>
</template>

<style scoped>
.form-container {
  position: relative;
}
.go-back {
  display: flex;
  position: absolute;
  bottom: 0px;
}
.send {
  text-align: end;
}
form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md)
}
button {
  background-color: transparent;
  text-decoration: underline;
  font-size: var(--font-size-sm);
  letter-spacing: 0.08em;
  color: var(--color-primary);
  margin: var(--space-sm);
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
