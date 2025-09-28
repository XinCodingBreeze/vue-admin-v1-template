<template>
  <div>
    <div>
      <el-button type="primary" @click="exportExcel">导出Excel</el-button>
    </div>
    <div>
      <el-table :data="tableData" id="table" style="width: 100%">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import exportToExcel from "@/utils/exportToExcel.js";
import { ref } from "vue";
const tableData = ref([
  { name: "张三", age: 18, address: "北京市" },
  { name: "李四", age: 20, address: "上海市" },
  { name: "王五", age: 22, address: "广州市" },
]);
const exportExcel = () => {
  exportToExcel("table");
};
</script>

<style scoped></style>
