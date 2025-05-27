<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CloseIcon from '../assets/close.svg'

const { t } = useI18n()
const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const closeModal = (): void => {
  emit('update:modelValue', false)
}
</script>

<template>
  <section>
    <Teleport to="body">
      <div
        v-if="props.modelValue"
        @click.self="closeModal"
        role="dialog"
        aria-modal="true"
        class="modal-container"
      >
        <div class="modal-content">
          <button
            class="close-button"
            @click="closeModal"
            :aria-label="t('labels.close')"
          >
            <CloseIcon fill="var(--color-secondary)" class="svg" />
          </button>

          <slot />
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.svg {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  align-self: flex-end;
}
.close-button {
  display: flex;
  justify-content: end;
}
.modal-container {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blure(var(--space-xs));
  inset: 0;
}

button {
  background-color: transparent;
}

.modal-content {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  min-width: 300px;
  max-width: 90vw;
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface-bright);
  color: var(--color-error-container);
}
</style>
