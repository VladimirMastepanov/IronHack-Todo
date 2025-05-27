<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Button from '../shared/Button.vue'
import LangSwitcher from './LangSwitcher.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { ref } from 'vue'
import { useUser } from '../store/user'
import DefaultAvatar from '../assets/account_circle.svg'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const router = useRouter()
const userStore = useUser()
const { isAuth, user } = storeToRefs(userStore)
const { logOutUser } = userStore
const isSubmitting = ref<boolean>(false)

const logout = async (): Promise<void> => {
  try {
    isSubmitting.value = true
    await logOutUser()
    router.push('/auth')
  } catch (err) {
    console.error('logout error:', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section>
    <header>
      <img
        v-if="isAuth && user?.image"
        :src="user.image"
        :alt="t('common.avatarAlt')"
      />
      <DefaultAvatar class="svg" v-else :alt="t('common.avatarAlt')" />

      <div class="header-buttons">
        <ThemeSwitcher />
        <LangSwitcher />

        <Button
          class="logout"
          v-if="isAuth"
          @click="logout"
          :disabled="isSubmitting"
          >{{ t('buttons.logout') }}</Button
        >
      </div>
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
.header-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-xs);
  justify-content: end;
}
.logout {
  padding: 0 0 0 var(--font-size-sm);
}
img {
  width: 4rem;
  height: auto;
  border-radius: var(--radius-round);
  object-fit: cover;
}
.svg {
  padding: 0;
  width: 4rem;
  height: auto;
  display: flex;
}
p {
  font-weight: var(--font-weight-light);
}
</style>
