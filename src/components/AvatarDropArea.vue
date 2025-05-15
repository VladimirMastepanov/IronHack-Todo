

<script lang="ts" setup>
import { ref } from "vue";

const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);

const selectFile = () => {
  fileInput.value?.click();
};

const handleDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files[0];
  if (file && file.type.startsWith("image/")) {
    readFile(file);
  }
};

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file && file.type.startsWith("image/")) {
    readFile(file);
  }
};

const readFile = (file: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    previewUrl.value = reader.result as string;
    // Тут можно вызвать emit или API-запрос
    console.log("Файл загружен:", file.name);
  };
  reader.readAsDataURL(file);
};
</script>


<template>
  <div
    class="drop-area"
    @dragover.prevent
    @drop.prevent="handleDrop"
    @click="selectFile"
  >
    <img
      v-if="previewUrl"
      :src="previewUrl"
      alt="Avatar preview"
      class="avatar"
    />
    <div v-else class="placeholder">Перетащи файл сюда или кликни</div>
    <input
      type="file"
      accept="image/*"
      ref="fileInput"
      class="hidden"
      @change="handleFileSelect"
    />
  </div>
</template>

<style scoped>
.drop-area {
  border: 2px dashed #ccc;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  max-width: 200px;
  margin: auto;
}
.avatar {
  max-width: 100%;
  border-radius: 50%;
}
.placeholder {
  color: #888;
}
.hidden {
  display: none;
}
</style>
