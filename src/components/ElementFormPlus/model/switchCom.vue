<template>
  <el-switch v-model="object[meta.prop]" :disabled="meta.disabled" />
</template>
<script setup>
defineProps({
  clearable: {
    type: Boolean,
    default: true,
  },
  meta: {
    type: Object,
    default: () => {},
  },
  object: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
<style lang="scss" scoped></style>
