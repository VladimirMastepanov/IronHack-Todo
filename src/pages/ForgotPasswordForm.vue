<script setup lang="ts">
import Button from '../shared/Button.vue'
import Input from '../shared/Input.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import PreloadSpinner from '../assets/preload.svg'
import { isEmailValid } from '../features/handleFormCheck'
import { useUser } from '../store/user'
//TODO
const { t } = useI18n()
const router = useRouter()
const { recoverPassword } = useUser()

const emailName = 'email',
  emailPlaceholder = 'placeholders.email',
  emailType = 'email',
  emailConfirmationInputId = 'email-confirmation-input'

const email = ref('')

const isSubmitting = ref<boolean>(false)
const shouldBeFocused = ref<boolean>(true)
const isEmailSend = ref<boolean>(false)

const emailError = ref<string>('')

const goBack = () => {
  router.push('/auth')
}

const submitForm = async () => {
  isSubmitting.value = true
  emailError.value = ''
  emailError.value = isEmailValid(email.value) ? '' : t('errors.invalidEmail')

  if (!emailError.value) {
    await recoverPassword(email.value)
    isEmailSend.value = true
  }
  isSubmitting.value = false
}
</script>

<template>
  <section>
    <div v-if="!isEmailSend" class="forgote-form">
      <PreloadSpinner v-if="isSubmitting" class="spinner" />
      <h1>{{ t('common.loginTitle') }}</h1>
      <form
        @submit.prevent="submitForm"
        :aria-disabled="isSubmitting"
        novalidate
      >
        <div>
          <label :for="emailConfirmationInputId">{{
            t('labels.emailLogin')
          }}</label>
          <Input
            v-focus="shouldBeFocused"
            v-model:model-value="email"
            :name="emailName"
            :placeholder="emailPlaceholder"
            :type="emailType"
            :id="emailConfirmationInputId"
            :disabled="isSubmitting"
          />
          <p class="error">{{ emailError || '\u00A0' }}</p>
        </div>

        <div class="send">
          <Button type="submit" :disabled="isSubmitting">{{
            t('buttons.submitLogin')
          }}</Button>
        </div>
      </form>
      <Button class="go-back" @click="goBack" :disabled="isSubmitting">{{
        t('buttons.return')
      }}</Button>
    </div>
    <div v-else class="spinner">{{ t('common.reset_password_message') }}</div>
  </section>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
}
.forgote-form {
  position: relative;
}
.go-back {
  display: flex;
  position: absolute;
  bottom: 0px;
}
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
.send {
  text-align: end;
}
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: var(--space-3xl);
  width: auto;
}
</style>
