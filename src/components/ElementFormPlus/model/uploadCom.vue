<template>
  <upload-images
    v-model="currentValue"
    :limit="meta.limit || 1"
    :type="meta.type || 'image'"
    :mode="meta.mode || 1"
    :button-text="meta.buttonText || '上传图片'"
    :name="meta.name || 'files'"
  />
</template>

<script setup>
import { ref, watch, defineProps } from "vue";
import UploadImages from "@/components/upload-images/index.vue";

const props = defineProps({
  meta: {
    type: Object,
    default: () => ({}),
  },
  object: {
    type: Object,
    default: () => ({}),
  },
});
// const baseUrl = import.meta.env.VITE_APP_API_URL;

// 获取当前值
const currentValue = ref(props.object[props.meta.prop] || "");

// 监听值变化，同步到父对象
watch(
  currentValue,
  (newVal) => {
    props.object[props.meta.prop] = newVal;
  },
  { immediate: true },
);

// 监听父对象的值变化
watch(
  () => props.object[props.meta.prop],
  (newVal) => {
    if (newVal !== currentValue.value) {
      currentValue.value = newVal;
    }
  },
);
</script>

<style scoped>
/* 上传组件样式 */
</style>
