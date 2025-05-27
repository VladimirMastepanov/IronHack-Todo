<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  placeholder: string
  type: string
  modelValue: string
  name: string
  id: string
  focus?: boolean
  errorMessage?: string
  hasError?: string
}>()
const { placeholder, type, id } = props
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
  <section class="search-form">
    <input
      v-focus="props.focus"
      :value="props.modelValue"
      :type="type"
      :id="id"
      :placeholder="t(`${placeholder}`)"
      @input="onInput"
    />
  </section>
</template>

<style scoped>
.search-form {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-md);
}

input {
  all: unset;
  padding: var(--space-xs) var(--space-xs) var(--space-xs) var(--space-md);
  text-align: left;
  background-color: var(--color-inverse-on-surface);
  border: 1px var(--color-secondary-container) solid;
  border-radius: var(--radius-lg);
  color: var(--color-on-surface);
  font-size: var(--font-size-md);
}
</style>
