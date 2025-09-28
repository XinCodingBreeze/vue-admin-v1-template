<template>
  <!-- 有子路由且页面允许显示 -->
  <el-sub-menu
    :index="data.meta.fullPath"
    v-if="
      data &&
      data.children &&
      data.children.length > 0 &&
      data.meta.isPageShow !== false
    "
  >
    <template #title>
      <el-icon>
        <component :is="data.meta.icon"></component>
      </el-icon>
      <span>{{ data.meta.name }}</span>
    </template>
    <MenuItem
      v-for="item in visibleChildren"
      :key="item.meta.fullPath"
      :data="item"
      :collapsed="collapsed"
    />
  </el-sub-menu>
  <!-- 没有子路由且页面允许显示 -->
  <el-menu-item
    :index="data.meta.fullPath"
    v-else-if="data.meta.isPageShow !== false"
  >
    <el-icon>
      <component :is="data.meta.icon"></component>
    </el-icon>
    <span>{{ data.meta.name }}</span>
  </el-menu-item>
</template>

<script setup>
import MenuItem from "./menu.vue";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
});

// 过滤显示的子路由
const visibleChildren = computed(() => {
  if (!props.data.children) return [];
  return props.data.children.filter(
    (child) => child.meta?.isPageShow !== false,
  );
});

// 处理菜单点击
const handleMenuClick = (path) => {
  router.push(path);
};
</script>

<style scoped lang="scss"></style>
