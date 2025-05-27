<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: string
  name: string
  id: string
  focus?: boolean
  errorMessage?: string
  hasError?: string
}>()
const { id, name } = props
const { t } = useI18n()
const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [event: Event]
}>()

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', event)
}
</script>

<template>
  <section>
    <textarea
      v-focus="props.focus"
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
  background-color: var(--color-inverse-on-surface);
  border: 1px solid var(--color-surface-bright);
  border-radius: var(--radius-sm);
  color: var(--color-inverse-surface);
  font-size: var(--font-size-md);
  width: 100%;
}
</style>
