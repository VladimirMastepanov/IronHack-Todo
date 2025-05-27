<script setup lang="ts">
import Button from '../shared/Button.vue'
import Input from '../shared/Input.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUser } from '../store/user'
import PreloadSpinner from '../assets/preload.svg'
import {
  isPassvordLengthValid,
  isPasswordMarch,
} from '../features/handleFormCheck'
const { t } = useI18n()
const router = useRouter()
const { updateUser } = useUser()

const passwordName = 'password',
  passwordConfigName = 'passwordConfig',
  passwordPlaceholder = 'placeholders.password',
  passwordType = 'password'

const password = ref<string>(''),
  passwordConf = ref<string>('')

const isSubmitting = ref<boolean>(false)

const passwordError = ref<string>('')

const shouldBeFocused = ref<boolean>(true)


const submitForm = async () => {
  isSubmitting.value = true
  passwordError.value = ''

  passwordError.value = isPasswordMarch(password.value, passwordConf.value)
    ? ''
    : t('errors.passwordsDontMatch')
  passwordError.value = isPassvordLengthValid(
    password.value,
    passwordConf.value
  )
    ? ''
    : t('errors.invalidPassword')

  if (!passwordError.value) {
    await updateUser(password.value)
    router.push('/')
  }

  isSubmitting.value = false
}
</script>

<template>
  <section>
    <div class="form-container">
      <PreloadSpinner v-if="isSubmitting" class="spinner" />

      <h1>{{ t('common.signUpTitle') }}</h1>
      <form
        @submit.prevent="submitForm"
        :aria-disabled="isSubmitting"
        novalidate
      >
        <div class="input-grup">
          <label :for="passwordName">{{ t('labels.passwordSign') }}</label>
          <Input
            v-focus="shouldBeFocused"
            v-model:model-value="password"
            :name="passwordName"
            :id="passwordName"
            :placeholder="passwordPlaceholder"
            :type="passwordType"
            :disabled="isSubmitting"
          />
          <p class="error">{{ passwordError || '\u00A0' }}</p>
        </div>
        <div class="input-grup">
          <label :for="passwordConf">{{ t('labels.passwordConfirm') }}</label>
          <Input
            v-model:model-value="passwordConf"
            :name="passwordConfigName"
            :id="passwordConfigName"
            :placeholder="passwordPlaceholder"
            :type="passwordType"
            :disabled="isSubmitting"
          />
          <p class="error">{{ passwordError || '\u00A0' }}</p>
        </div>

        <div class="submit">
          <Button type="submit" :disabled="isSubmitting">{{
            t('buttons.submitSign')
          }}</Button>
        </div>
      </form>
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
