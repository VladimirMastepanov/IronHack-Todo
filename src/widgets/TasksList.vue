<script setup lang="ts">
import { ref } from "vue";
import {
  type EditedTaskDescription,
  type ImportanceType,
} from "../types/types";
import Button from "../shared/Button.vue";
import Textarea from "../shared/Textarea.vue";
import { useTasks } from "../store/task";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useSort } from "../store/sort";
import { computed } from "vue";
import ArrowDownSvg from "../assets/arrow_down.svg";
import ArrowUpSvg from "../assets/arrow_up.svg";
import CheckOutlineIcon from "../assets/check_box_outline.svg";
import CheckDoneIcon from "../assets/check_box_done.svg";
import DeleteIcon from "../assets/delete.svg";
import { useSearch } from "../store/search";
import { getFiltredTasks } from "../features/getFiltredTasks";
import { getSortedTasks } from "../features/getSortedTasks";
import Select from "../shared/Select.vue";
import Modal from "../shared/Modal.vue";

const searchStore = useSearch();
const sortStore = useSort();
const { sortBy } = storeToRefs(sortStore);

const tasksStore = useTasks();
const { tasks } = storeToRefs(tasksStore);
const { removeTaskFromDb, updateTaskInDb, toggleTaskIsDone } = tasksStore;

onMounted(async () => {
  tasksStore.getTasksFromDb();
});

const tasksForDisplay = computed(() => {
  if (searchStore.searchTerm.length > 0) {
    const filtred = getFiltredTasks(tasks.value, searchStore.searchTerm);
    return getSortedTasks(filtred, sortBy.value);
  } else {
    return getSortedTasks(tasks.value, sortBy.value);
  }
});

const { t } = useI18n();

const isModalOpen = ref<boolean>(false);
const taskIdForRemove = ref<number | null>(null);

const taskText = ref<string>(""),
  taskImpartance = ref<ImportanceType>(1),
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
    };
    taskText.value = currentTask.text;
    taskImpartance.value = currentTask.importance;
  }
};
const closeCard = (): void => {
  taskText.value = "";
  taskImpartance.value = 1;
  openedCardId.value = null;
  taskIdForRemove.value = null;
};

const saveChanges = async (id: number, text: string, importance: 1 | 2 | 3) => {
  taskErrorMessage.value = "";
  if (taskText.value.length === 0) {
    taskErrorMessage.value = t("errors.emptyError");
  } else {
    isSubmitting.value = true;
    await updateTaskInDb(id, text, importance);
    closeCard();
    isSubmitting.value = false;
  }
};

const cancelChanges = (): void => {
  if (originalTask.value && openedCardId.value !== null) {
    taskText.value = originalTask.value.text;
    taskImpartance.value = originalTask.value.importance;
  }
};

const onDeleteCkick = (id: number) => {
  taskIdForRemove.value = id;
  isModalOpen.value = true;
};

const deleteTask = async () => {
  isSubmitting.value = true;
  if (taskIdForRemove.value) {
    await removeTaskFromDb(taskIdForRemove.value);
  }
  taskIdForRemove.value = null;
  isSubmitting.value = false;
  isModalOpen.value = false;
  closeCard();
};
</script>

<template>
  <section>
    <div class="tasks-list" aria-live="polite">
      <ul>
        <li v-for="task in tasksForDisplay" :key="task.id" class="task-wrapper">
          <section>
            <div class="list-element-container">
              <template v-if="openedCardId !== task.id">
                <ArrowDownSvg
                  @click="openCard(task.id)"
                  class="svg"
                  fill="var(--color-on-surface)"
                />
                <p>{{ task.text }}</p>
                <CheckDoneIcon
                  :key="`done-${task.id}`"
                  @click="toggleTaskIsDone(task.id, task.isDone)"
                  fill="var(--color-on-surface)"
                  class="svg"
                  v-if="task.isDone"
                />
                <CheckOutlineIcon
                  :key="`outline-${task.id}`"
                  @click="toggleTaskIsDone(task.id, task.isDone)"
                  fill="var(--color-on-surface)"
                  class="svg"
                  v-else
                />
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
                    <Select
                      v-model="taskImpartance"
                      :option="task.importance"
                    />
                  </div>

                  <div class="task-form-row controls">
                    <div class="left-group">
                      <div class="up">
                        <ArrowUpSvg
                          @click="closeCard()"
                          class="svg"
                          fill="var(--color-on-surface)"
                        />
                      </div>

                      <Button
                        :disabled="isSubmitting"
                        @click="onDeleteCkick(task.id)"
                      >
                        <DeleteIcon
                          fill="var(--color-on-secondary)"
                          class="delete-icon"
                        />
                      </Button>
                    </div>

                    <div class="buttons">
                      <Button :disabled="isSubmitting" @click="cancelChanges">{{
                        t("buttons.cancel")
                      }}</Button>
                      <Button
                        :disabled="isSubmitting"
                        @click="saveChanges(task.id, taskText, taskImpartance)"
                        >{{ t("buttons.save") }}</Button
                      >
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </section>
        </li>
      </ul>
    </div>
    <Modal v-model="isModalOpen">
      <div class="modal-content">
              <h4>{{t('labels.confirmation')}}</h4>
      <Button :disabled="isSubmitting" @click="deleteTask">
        <DeleteIcon fill="var(--color-on-secondary)" class="delete-icon"
      /></Button>

      </div>
    </Modal>
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
.svg {
  padding: 0 var(--space-sm) 0 var(--space-sm);
  height: 1.4rem;
  width: 1.4rem;
  display: flex;
  flex-shrink: 0;
}
.delete-icon {
  padding: 0;
  height: 1.2em;
  display: flex;
  justify-content: center;
  width: auto;
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
  gap: var(--space-md);
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
  /* background-color: var(--color-tertiary-container); */
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
  background-color: var(--color-surface-container);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--color-surface-bright);
  color: var(--color-on-surface)
}
.left-group {
  display: flex;
  gap: var(--space-sm);
}
.up {
  display: flex;
  align-items: flex-end;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: var(--space-sm);
}

select {
  position: relative;
  font: inherit;
}

.modal-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg)
}
</style>
