<script setup lang="ts">
import { ref } from "vue";
import {
  type TaskDescription,
  type EditedTaskDescription,
} from "../types/types";
import Button from "../shared/Button.vue";
import { useRouter } from "vue-router";
import { useTasks } from "../store/task";
import { useUser } from "../store/user";
import { storeToRefs } from "pinia";

const router = useRouter();
const tasksStore = useTasks();
const { tasks } = storeToRefs(tasksStore);
const { user } = useUser();
const { insertTaskToDb } = tasksStore;

const taskText = ref<string>(""),
  taskImpartance = ref<1 | 2 | 3>(1),
  taskColor = ref<string>(""),
  taskInputName = "",
  taskInputType = "text",
  taskInputPlaceholder = "placeholder.", //TODO Enter task description...
  taskInputLabel = "label.", //TODO Task description
  taskInputId = "add-task-form",
  taskErroeMessage = ref<string>(""), //TODO
  isSubmitting = ref<boolean>(false);

const closeForm = (): void => {
  router.push("/");
};
const clearInput = (): void => {
  taskText.value = "";
};
const saveChanges = async () => {
  taskErroeMessage.value = "";
  if (taskText.value.length === 0) {
    taskErroeMessage.value = "ты забыл записать задачу";
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
          <textarea
            class="input"
            v-model:="taskText"
            :name="taskInputName"
            :id="taskInputId"
            :type="taskInputType"
            :placeholder="taskInputPlaceholder"
            rows="6"
            :disabled="isSubmitting"
          ></textarea>
          <Button @click="clearInput" :disabled="isSubmitting">x</Button>
        </div>
        <p class="error">{{ taskErroeMessage || "\u00A0" }}</p>
        <div class="task-form-row controls">
          <label>Importance:</label>
          <select v-model.number="taskImpartance" :disabled="isSubmitting">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <label>Color:</label>
          <input type="color" v-model="taskColor" :disabled="isSubmitting" />
        </div>

        <div class="task-form-row buttons">
          <Button
            :disabled="tasks.length === 0 || isSubmitting"
            @click="closeForm"
            >X</Button
          >
          <Button @click="saveChanges" :disabled="isSubmitting">Save</Button>
        </div>
      </div>
    </div>
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
}
.input {
  width: 100%;
}
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
}
.controls {
  justify-content: end;
  gap: var(--space-sm);
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
