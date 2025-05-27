<script lang="ts" setup>
import { ref, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const avatarPreviewAlt = t('common.avatarPreviewAlt')

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const emit = defineEmits<{
  (e: 'upload-avatar', file: File): void
}>()

const selectFile = () => {
  fileInput.value?.click()
}

const handleDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    readFile(file)
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file && file.type.startsWith('image/')) {
    readFile(file)
  }
}

const readFile = (file: File) => {
  const reader = new FileReader()
  reader.onload = () => {
    previewUrl.value = reader.result as string
    console.log('Файл загружен:', file.name)
    emit('upload-avatar', file)
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <section>
    <label for="drop">{{ t('labels.dropzoneLable') }}</label>
    <div
      class="drop-area"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="selectFile"
    >
      <img
        v-if="previewUrl"
        :src="previewUrl"
        :alt="avatarPreviewAlt"
        class="avatar"
      />
      <div v-else>{{ t('common.dropzoneText') }}</div>
      <input
        name="drop"
        type="file"
        accept="image/*"
        ref="fileInput"
        class="hidden"
        @change="handleFileSelect"
      />
    </div>
    <p>{{ t('common.dropLimits') }}</p>
  </section>
</template>

<style scoped>
.drop-area {
  border: 2px dashed var(--color-outline);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  text-align: center;
  cursor: pointer;
  margin: var(--space-sm);
}
.avatar {
  width: var(--space-4xl);
  height: var(--space-4xl);
  border-radius: var(--radius-round);
}

.hidden {
  display: none;
}
</style>
