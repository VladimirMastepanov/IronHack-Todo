<script setup lang="ts">
import Button from '../shared/Button.vue'
import { useThemeStore } from '../store/theme'
import LightThemeIcon from '../assets/light_mode.svg'
import DarkThemeIcon from '../assets/dark_mode.svg'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isLightTheme } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
</script>

<template>
  <section>
    <Button @click="toggleTheme">
      <LightThemeIcon
        fill="var(--color-on-secondary)"
        class="svg"
        v-if="isLightTheme"
      />
      <DarkThemeIcon fill="var(--color-on-secondary)" class="svg" v-else />
    </Button>
  </section>
</template>

<style scoped>
.svg {
  padding: 0;
  height: 1.2em;
  width: auto;
  display: flex;
}
</style>
