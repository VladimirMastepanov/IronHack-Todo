<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Button from '../shared/Button.vue';
import { useThemeStore} from '../store/theme';

const { t } = useI18n();
const themeStore = useThemeStore();
const toggleTheme = () => {
  console.log('toggleTheme')
  themeStore.toggleTheme();
} 

</script>

<template>
  <section>
    <Button @click="toggleTheme" >{{ t('buttons.changeTheme') }}</Button>

  </section>
</template>

<style scoped>


</style>
