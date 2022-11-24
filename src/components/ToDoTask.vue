<script setup>
import { ElButton, ElInput } from "element-plus";
import { Delete, Check, Back } from "@element-plus/icons-vue";
const props = defineProps({
  task: { name: { type: String, default: "none" }, id: { type: String } },
  done: { type: Boolean, default: false },
});
const emit = defineEmits(["delete_task", "finish_task", "return_task", "update_name"]);
function modifyTask(id, eventName) {
  emit(eventName, id);
}
</script>
<template>
  <div class="todo">
    <div class="todo__header">
      <el-button
        type="success"
        :icon="Check"
        @click="modifyTask(props.task._id, 'finish_task')"
        v-if="!props.done"
      />
      <div class="todo__header-input">
        <el-input
          type="text"
          v-model="props.task.name"
          :disabled="props.done"
          @input="modifyTask(props.task._id, 'update_name')"
          clearable
        />
      </div>

      <el-button
        type="danger"
        :icon="Delete"
        @click="modifyTask(props.task._id, 'delete_task')"
        v-if="!props.done"
      />
      <el-button
        type="primary"
        :icon="Back"
        @click="modifyTask(props.task._id, 'return_task')"
        v-if="props.done"
      />
    </div>
  </div>
</template>
<style scoped>
.todo {
  width: 20rem;
  height: 5rem;
  padding: 1rem;
  gap: 1rem;
  border-radius: 5px;
  border: 1px solid rgb(238, 236, 236);
  box-shadow: 2px 8px 11px -8px rgba(0, 0, 0, 0.74);
  transition: all 0.3s;
}

.todo:hover {
  box-shadow: 8px 5px 16px -7px #000000;
}

.todo__header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.todo__header-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
