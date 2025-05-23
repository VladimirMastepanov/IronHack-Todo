<script setup lang="ts">
import { ref } from "vue";
import { type EditedTaskDescription } from "../types/types";
import Button from "../shared/Button.vue";
import Textarea from "../shared/Textarea.vue";
import { useTasks } from "../store/task";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const tasksStore = useTasks();
const { tasks } = storeToRefs(tasksStore);
const { removeTaskFromDb, updateTaskInDb, toggleTaskIsDone } = tasksStore;

onMounted(async () => {
  tasksStore.getTasksFromDb();
});

const { t } = useI18n();

const taskText = ref<string>(""),
  taskImpartance = ref<1 | 2 | 3>(1),
  taskColor = ref<string>(""),
  taskInputName = "",
  taskInputLabel = t("labels.new"),
  isSubmitting = ref<boolean>(false),
  taskErrorMessage = ref<string>("");

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
const saveChanges = async (id: number, text: string, importance: 1 | 2 | 3, color: string) => {
  taskErrorMessage.value = '';
  if (taskText.value.length === 0 ) {
    taskErrorMessage.value = t('errors.emptyError');
  } else {
    isSubmitting.value = true;
    await updateTaskInDb(id, text, importance, color);
    closeCard();
    isSubmitting.value = false;

  }
};


const cancelChanges = (): void => {
  if (originalTask.value && openedCardId.value !== null) {
    taskText.value = originalTask.value.text;
    taskImpartance.value = originalTask.value.importance;
    taskColor.value = originalTask.value.color;
  }
};

const deleteTask = async (taskId: number) => {
  taskErrorMessage.value = "";
  if (taskText.value.length === 0) {
    taskErrorMessage.value = t("errors.emptyError");
  } else {
    isSubmitting.value = true;
    await removeTaskFromDb(taskId);
    closeCard();
    isSubmitting.value = false;
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
                    <label
                      :for="getTaskInputId(task.id)"
                      class="lable-hidden"
                      >{{ taskInputLabel }}</label
                    >
                    <Textarea
                      class="textarea"
                      v-model="taskText"
                      :name="taskInputName"
                      :id="getTaskInputId(task.id)"
                      :disabled="isSubmitting"
                    />
                  </div>

                  <div class="task-form-row settings">
                    <label>{{ t("labels.importance") }}</label>
                    <select v-model.number="taskImpartance">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <label>{{ t("labels.color") }}</label>
                    <input type="color" v-model="taskColor" />
                  </div>

                  <div class="task-form-row controls">
                    <div class="go-back">
                      <Button :disabled="isSubmitting" @click="closeCard()"
                        >A</Button
                      >
                    </div>

                    <div class="buttons">
                      <Button
                        :disabled="isSubmitting"
                        @click="deleteTask(task.id)"
                        >Delete</Button
                      >
                      <Button :disabled="isSubmitting" @click="cancelChanges">{{
                        t("buttons.cancel")
                      }}</Button>
                      <Button :disabled="isSubmitting" @click="saveChanges(task.id, taskText, taskImpartance, taskColor)">{{
                        t("buttons.save")
                      }}</Button>
                    </div>
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
.textarea {
  display: flex;
  width: 100%;
}
.settings {
  display: flex;
  justify-content: end;
  gap: var(--space-sm);
}
.controls {
  justify-content: space-between;
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
.go-back {
  display: flex;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: var(--space-sm);
}
</style>
