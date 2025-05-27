<script setup lang="ts">
import Button from '../shared/Button.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const navigateToLogin = (): void => {
  router.push('/login')
}

const navigateToSignIn = (): void => {
  router.push('/signup')
}
</script>

<template>
  <section>
    <div class="auth-main">
      <div>
        <p>{{ t('common.haveAccount') }}</p>
        <Button @click="navigateToLogin">{{ t('buttons.signIn') }}</Button>
      </div>

      <div>
        <p>{{ t('common.firstTime') }}</p>
        <Button @click="navigateToSignIn">{{ t('buttons.signUp') }}</Button>
      </div>
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
