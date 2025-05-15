<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Button from "../shared/Button.vue";
import SortByAlphaSvg from "../assets/sort-alphabetical-variant.svg";
import SortSvg from '../assets/format-list-checks.svg';

const { t } = useI18n();

const buttonAddBackground = "var(--color-on-tertiary)";
const buttonAddColor = "var(--color-tertiary)";
const buttonAddRipple = "var(--color-error)";

const buttonControlBackground = "var(--color-inverse-tertiary)";
const buttonControlColor = "var(--color-tertiary)";
const buttonControlRipple = "var(--color-error)";
</script>

<template>
  <section class="buttons">
    <div class="control">
      <Button
        :backgroundColor="buttonControlBackground"
        :rippleColor="buttonControlRipple"
        :color="buttonControlColor">
        <SortByAlphaSvg fill="var(--color-tertiary)" class="svg"/>
      </Button>
      <Button
        :backgroundColor="buttonControlBackground"
        :rippleColor="buttonControlRipple"
        :color="buttonControlColor">
        <SortSvg fill="var(--color-tertiary)" class="svg" />
      </Button>
    </div>
    <Button
      :backgroundColor="buttonAddBackground"
      :rippleColor="buttonAddRipple"
      :color="buttonAddColor">
      <div class="add-task">
        <p>{{ t("buttons.addTask") }}</p>
      </div>
    </Button
    >
  </section>
</template>

<style scoped>
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: var(--space-xs);
  margin: 0 var(--space-sm);
  align-items: center;
}
.control {
  display: flex;
  flex-direction: row;
  gap: var(--space-xs);
}
/* .control-button-icon {
  fill: var(--color-tertiary);
} */
 .svg {
  padding: 0;
  height: 1em; 
  width: auto;
  /* margin: 0 var(--space-sm) 0 var(--space-sm); */
 }
.add-task {
  display: flex;
  align-items: center;
}
</style>
