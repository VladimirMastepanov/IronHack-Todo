<script setup lang="ts">
import { ref } from "vue";
import Button from "../shared/Button.vue";
import Textarea from "../shared/Textarea.vue";
import { useRouter } from "vue-router";
import { useTasks } from "../store/task";
import { useUser } from "../store/user";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const router = useRouter();
const tasksStore = useTasks();
const { tasks } = storeToRefs(tasksStore);
const { user } = useUser();
const { insertTaskToDb } = tasksStore;
const{t} = useI18n();

const taskText = ref<string>(""),
  taskImpartance = ref<1 | 2 | 3>(1),
  taskColor = ref<string>(""),
  taskInputName = "",


  taskInputLabel = t('labels.new'), 
  taskInputId = "add-task-form",
  taskErrorMessage = ref<string>(""),
  isSubmitting = ref<boolean>(false);

const closeForm = (): void => {
  router.push("/");
};
const clearInput = (): void => {
  taskText.value = "";
};
const saveChanges = async () => {
  taskErrorMessage.value = "";
  if (taskText.value.length === 0) {
    taskErrorMessage.value = t('errors.emptyError');
  } else {
    isSubmitting.value = true;
    if (user && user.id) {
      await insertTaskToDb(
        taskText.value,
        user.id,
        taskColor.value,
        taskImpartance.value
      );
      router.push("/");
    }
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section>
    <div class="list-element-container">
      <div class="task-form">
        <div class="task-form-row">
          <label :for="taskInputId" class="lable-hidden">{{
            taskInputLabel
          }}</label>
          <Textarea
          class="textarea"
            v-model="taskText"
            :name="taskInputName"
            :id="taskInputId"
            :disabled="isSubmitting"
           />
        </div>
        <p class="error">{{ taskErrorMessage || "\u00A0" }}</p>
        <div class="task-form-row controls">
          <label>{{t('labels.importance')}}</label>
          <select v-model.number="taskImpartance" :disabled="isSubmitting">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <label>{{t('labels.color')}}</label>
          <input type="color" v-model="taskColor" :disabled="isSubmitting" />
        </div>

        <div class="task-form-row buttons">
          <Button
            :disabled="tasks.length === 0 || isSubmitting"
            @click="closeForm"
            >Go back</Button
          >
          <Button @click="saveChanges" :disabled="isSubmitting">{{t('buttons.save')}}</Button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.task-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.error {
  color: var(--color-error-container);
  font-size: 0.7em;
  text-align: left;
  padding: 0 0 0 var(--space-md);
}
.task-form-row {
  display: flex;
  gap: var(--space-sm);
  width: 100%;
}
.controls {
  justify-content: end;
  gap: var(--space-sm);
}
.textarea {
  display: flex;
  width: 100%;
}

.buttons {
  justify-content: space-between;
  margin-top: var(--space-xl);
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

.list-element-container {
  display: flex;
  padding: var(--space-md) var(--space-sm) var(--space-md) var(--space-sm);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-sm);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--color-outline);
}
</style>
