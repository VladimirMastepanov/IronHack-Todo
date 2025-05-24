<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Button from "../shared/Button.vue";
import SortByAlphaSvg from "../assets/sort_by_alpha.svg";
import SortByStatus from "../assets/format-list-checks.svg";
import SortByImportance from "../assets/priority_high.svg";
import { useRouter } from "vue-router";
import { useSort } from "../store/sort";

const { t } = useI18n();
const router = useRouter();
const { sortByText, sortByStatus, sortByImportance } = useSort();

const buttonAddBackground = "var(--color-on-tertiary)";
const buttonAddColor = "var(--color-tertiary)";
const buttonAddRipple = "var(--color-error)";

const buttonControlBackground = "var(--color-inverse-tertiary)";
const buttonControlColor = "var(--color-tertiary)";
const buttonControlRipple = "var(--color-error)";

const toAddTask = () => {
  router.push("/taskform");
};
</script>

<template>
  <section class="buttons">
    <div class="control">
      <Button
        :backgroundColor="buttonControlBackground"
        :rippleColor="buttonControlRipple"
        :color="buttonControlColor"
        @click="sortByText"
      >
        <SortByAlphaSvg fill="var(--color-tertiary)" class="svg" />
      </Button>
      <Button
        :backgroundColor="buttonControlBackground"
        :rippleColor="buttonControlRipple"
        :color="buttonControlColor"
        @click="sortByStatus"
      >
        <SortByStatus fill="var(--color-tertiary)" class="svg" />
      </Button>
      <Button
        :backgroundColor="buttonControlBackground"
        :rippleColor="buttonControlRipple"
        :color="buttonControlColor"
        @click="sortByImportance"
      >
        <SortByImportance fill="var(--color-tertiary)" class="svg" />
      </Button>
    </div>
    <Button
      :backgroundColor="buttonAddBackground"
      :rippleColor="buttonAddRipple"
      :color="buttonAddColor"
      @click="toAddTask"
    >
      <div class="add-task">
        <p>{{ t("buttons.addTask") }}</p>
      </div>
    </Button>
  </section>
</template>

<style scoped>
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: var(--space-xs);
  align-items: center;
}
.control {
  display: flex;
  flex-direction: row;
  gap: var(--space-xs);
}
.svg {
  padding: 0;
  height: 1.2em;
  width: auto;
  display: flex
}
.add-task {
  display: flex;
  align-items: center;
}
</style>
