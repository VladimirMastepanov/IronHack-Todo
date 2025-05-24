import { defineStore } from "pinia";
import { supabase } from "./supabase";
import { ref } from "vue";
import type { TaskDescription } from "../types/types";

export const useTasks = defineStore("tasks", () => {
  //STATE
  const tasks = ref<TaskDescription[]>([]);
  const taskError = ref<string | null>(null);

  //ACTIONS
  const getTasksFromDb = async () => {
    try {
      const { data: tasksFromDb, error } = await supabase
        .from("tasks")
        .select("*");
      if (error || !tasksFromDb) {
        if (error) taskError.value = error.message;
        throw error;
      }
      tasks.value = tasksFromDb.reverse();
    } catch (err) {
      console.error("getTasks error:", err);
    }
  };

  const insertTaskToDb = async (
    text: string,
    userId: string,
    importance: 1 | 2 | 3
  ) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert([
          {
            text,
            userId,
            importance,
            isDone: false,
          },
        ])
        .select();

      if (!data || error) {
        if (error) taskError.value = error.message;
        throw error;
      }

      const [newTask] = data;
      tasks.value.push(newTask);
    } catch (err) {
      console.error("insertTask error:", err);
    }
  };

  const toggleTaskIsDone = async (id: number, isDone: boolean) => {
    const newValue = !isDone;
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({ isDone: newValue })
        .eq("id", id)
        .select();

      if (!data || error) {
        if (error) taskError.value = error.message;
        throw error;
      }
      tasks.value = tasks.value.map((t) =>
        t.id === id ? { ...t, isDone: newValue } : t
      );
    } catch (err) {
      console.error("toggleTaskIsDone error:", err);
    }
  };

  const updateTaskInDb = async (
    id: number,
    text: string,
    importance: 1 | 2 | 3
  ) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          text,
          importance,
        })
        .eq("id", id)
        .select();

      if (!data || error) {
        if (error) taskError.value = error.message;
        throw error;
      }
      tasks.value = tasks.value.map((t) =>
        t.id === id ? { ...t, text, importance } : t
      );
    } catch (err) {
      console.error("updateTaskInDb error:", err);
    }
  };

  const removeTaskFromDb = async (id: number) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      tasks.value = tasks.value.filter((t) => t.id !== id);

      if (error) {
        taskError.value = error.message;
        throw error;
      }
    } catch (err) {
      console.error("removeTaskFromDb error:", err);
    }
  };

  return {
    tasks,
    taskError,
    getTasksFromDb,
    insertTaskToDb,
    updateTaskInDb,
    toggleTaskIsDone,
    removeTaskFromDb,
  };
});
