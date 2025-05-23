<script setup lang="ts">
import { ref } from "vue";
import {
  type TaskDescription,
  type EditedTaskDescription,
} from "../types/types";
import Button from "../shared/Button.vue";
import Input from "../shared/Input.vue";
import { useTasks } from "../store/task";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const tasksStore = useTasks();
const {tasks} = storeToRefs(tasksStore);

onMounted(async () => {
  tasksStore.getTasksFromDb();
})

const taskText = ref<string>(""),
  taskImpartance = ref<1 | 2 | 3>(1),
  taskColor = ref<string>(""),
  taskInputName = "",
  taskInputType = "text",
  taskInputPlaceholder = "placeholder.", //TODO Enter task description...
  taskInputLabel = "label."; //TODO Task description

const originalTask = ref<EditedTaskDescription | null>(null);
const getTaskInputId = (id: number): string => `task-input-${id}`;

const openedCardId = ref<number | null>(null);
const openCard = (id: number): void => {
  const currentTask = tasks.value.find((t) => t.id === id);
  openedCardId.value = id;
  if (currentTask) {
    originalTask.value = {
      text: currentTask.text,
      importance: currentTask.importance,
      color: currentTask.color,
    };
    taskText.value = currentTask.text;
    taskImpartance.value = currentTask.importance;
    taskColor.value = currentTask.color;
  }
};
const closeCard = (): void => {
  taskText.value = "";
  taskImpartance.value = 1;
  taskColor.value = "";
  openedCardId.value = null;
};

const clearInput = (): void => {
  taskText.value = "";
};
const saveChanges = (): void => {};
const cancelChanges = (): void => {
  if (originalTask.value && openedCardId.value !== null) {
    taskText.value = originalTask.value.text;
    taskImpartance.value = originalTask.value.importance;
    taskColor.value = originalTask.value.color;
  }
};
</script>

<template>
  <section>
    <div class="tasks-list" aria-live="polite">
      <ul>
        <li v-for="task in tasks" :key="task.id" class="task-wrapper">
          <section>
            <div class="list-element-container">
              <template v-if="openedCardId !== task.id">
                <Button @click="openCard(task.id)">V</Button>
                <p>{{ task.text }}</p>
                <div>O</div>
              </template>
              <template v-else>
                <div class="task-form">
                  <div class="task-form-row task-text">
                    <Button @click="closeCard()">X</Button>

                    <label
                      :for="getTaskInputId(task.id)"
                      class="lable-hidden"
                      >{{ taskInputLabel }}</label
                    >
                    <Input
                      v-model:model-value="taskText"
                      :name="taskInputName"
                      :id="getTaskInputId(task.id)"
                      :type="taskInputType"
                      :placeholder="taskInputPlaceholder"
                    />
                    <Button @click="clearInput">x</Button>
                  </div>

                  <div class="task-form-row controls">
                    <label>Importance</label>
                    <select v-model.number="taskImpartance">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <label>Color</label>
                    <input type="color" v-model="taskColor" />
                  </div>

                  <div class="task-form-row controls">
                    <Button @click="cancelChanges">Cancel</Button>
                    <Button @click="saveChanges">Save</Button>
                  </div>
                </div>
              </template>
            </div>
          </section>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: var(--space-sm);
}

.task-form-row {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.controls {
  justify-content: end;
  gap: var(--space-sm);
}
.task-text {
  justify-content: start;
  gap: var(--space-sm);
}

.task-wrapper {
  position: relative;
  transition: transform 0.3s ease;
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
.tasks-list {
  border-radius: var(--radius-md);
  background-color: var(--color-tertiary);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}
.list-element-container {
  display: flex;
  padding: var(--space-sm);
  padding-bottom: var(--space-2xl);
  margin-bottom: var(--space-cards-sm);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-sm);
  border-radius: var(--radius-md);
  background-color: var(--color-tertiary);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--color-outline);
}
</style>
