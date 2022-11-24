<script setup>
import ToDoTask from "./components/ToDoTask.vue";
import ApiService from "./api.js";
import { reactive, onMounted } from "vue";
import { ElButton } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
const state = reactive({
  currentTasks: [],
  doneTasks: [],
});
onMounted(async () => {
  await getTasks();
});
async function getTasks() {
  const tasks = await ApiService.GetTasks();
  tasks?.forEach((t) => {
    if (t.state == "currentTasks") {
      state.currentTasks.push(t);
    }
    if (t.state == "doneTasks") {
      state.doneTasks.push(t);
    }
  });
}
async function updateTask(task, state) {
  const updatedTask = { ...task };
  if (state) {
    updatedTask.state = state;
  }
  await ApiService.UpdateTask(updatedTask);
  return updatedTask;
}
async function moveTasks(task, newState) {
  const index = state[task.state].findIndex((t) => t._id == task._id);
  state[task.state].splice(index, 1);
  const updatedTask = await updateTask(task, newState);
  state[updatedTask.state].push(updatedTask);
}
async function deleteTask(id) {
  const taskIndex = state.currentTasks.findIndex((el) => el._id == id);
  state.currentTasks.splice(taskIndex, 1);
  await ApiService.DeleteTask(id);
}
async function createTask() {
  const task = await ApiService.CreateTask();
  state.currentTasks.push(task);
}
</script>
<template>
  <div class="wrapper">
    <div class="tasks-progres">
      <p>Текущие задачи:</p>
      <ToDoTask
        v-for="(task, index) in state.currentTasks"
        :key="index"
        :task="task"
        :done="false"
        @finish_task="moveTasks(task, 'doneTasks')"
        @update_name="updateTask(task)"
        @delete_task="deleteTask"
      />
      <el-button type="primary" :icon="Plus" @click="createTask" class="controls__add"
        >Добавить задачу</el-button
      >
    </div>
    <div class="tasks-progres">
      <p>Выполненые задачи:</p>
      <ToDoTask
        v-for="(task, index) in state.doneTasks"
        :key="index"
        :task="task"
        :done="true"
        @return_task="moveTasks(task, 'currentTasks')"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  gap: 2rem;
  padding: 2rem;
}

.tasks-progres {
  min-width: 25vw;
  max-height: 90vh;
  min-height: 8rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  border-radius: 5px;
  border: 1px solid rgb(238, 236, 236);
  box-shadow: 8px 5px 19px -6px #000000;
  /* width:30%; */
}
</style>
