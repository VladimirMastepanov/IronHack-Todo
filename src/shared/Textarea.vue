<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{
  modelValue: string;
  name: string;
  id: string;
  errorMessage?: string;
  hasError?: string;
}>();
const { id, name } = props;
const { t } = useI18n();
const emit = defineEmits<{
  "update:modelValue": [value: string];
  input: [event: Event];
}>();

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", value);
  emit("input", event);
};
</script>

<template>
  <section >
    <textarea
      :value="props.modelValue"
      type="text"
      :id="id"
      :placeholder="t('placeholders.textarea')" 
      @input="onInput"

      row="4"
      :name="name"
    ></textarea>
  </section>
</template>

<style scoped>

textarea {
  all: unset;
  resize: none;
  text-align: left;
  padding: var(--space-sm);
  background-color: var(--color-tertiary);
  border: 1px var(--color-outline) solid;
  border-radius: var(--radius-sm);
  color: var(--color-on-tertiary);
  font-size: var(--font-size-md);
  width: 100%;
}
</style>
