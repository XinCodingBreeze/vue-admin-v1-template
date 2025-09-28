<template>
  <RichEditor
    v-model="object[meta.prop]"
    :placeholder="meta.placeholder || '请输入内容...'"
    :height="meta.height || '300px'"
    :readonly="meta.readonly || false"
  />
</template>

<script setup>
import RichEditor from "@/components/RichEditor/index.vue";

defineProps({
  meta: {
    type: Object,
    default: () => ({}),
  },
  object: {
    type: Object,
    default: () => ({}),
  },
});
</script>
