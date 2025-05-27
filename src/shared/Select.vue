<script setup lang="ts">
import ArrowDownSvg from '../assets/arrow_down.svg'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ImportanceType, OptionsDescription } from '../types/types'
import { COLOR_OPTIONS } from '../constants'

const { t } = useI18n()
const props = defineProps<{
  modelValue: ImportanceType
  option: ImportanceType
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', option: ImportanceType): void
}>()
const options: OptionsDescription[] = [
  {
    label: 'importance.1',
    value: 1,
    color: 'var(--importance-high)',
  },
  {
    label: 'importance.2',
    value: 2,
    color: 'var(--importance-medium)',
  },
  {
    label: 'importance.3',
    value: 3,
    color: 'var(--importance-low)',
  },
]

const currentOption = ref<ImportanceType>(props.option)

const isOpen = ref<boolean>(false)

const toggleOpen = (): void => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: ImportanceType) => {
  currentOption.value = option
  emit('update:modelValue', option)
  isOpen.value = false
}
</script>

<template>
  <section>
    <div
      class="select"
      :style="{ backgroundColor: COLOR_OPTIONS[currentOption] }"
    >
      <ArrowDownSvg class="svg" @click.stop="toggleOpen" />
      <ul v-show="isOpen" class="select-list">
        <li
          v-for="option in options"
          :style="{ backgroundColor: option.color }"
          :key="option.value"
          :id="`option-id-${option.value}`"
          @click.stop="selectOption(option.value)"
          class="list-element"
        >
          <label :for="`option-id-${option.value}`" class="lable-hidden">{{
            t(option.label)
          }}</label>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.select {
  box-sizing: border-box;
  position: relative;
  height: 1.5rem;
  width: 2.5rem;
  border-radius: var(--radius-md);
  border: 2px var(--color-outline) solid;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
}
.select-list {
  position: absolute;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: var(--space-md);
  margin-top: var(--space-sm);
  margin-bottom: var(--space-sm);
  bottom: 100%;
  right: var(--space-xs);
  gap: var(--space-xs);
}
.list-element {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: var(--radius-round);
  color: rgb(14, 10, 10);
  z-index: 100;
  box-sizing: border-box;
  border: 2px var(--color-outline) solid;
}

.lable-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
