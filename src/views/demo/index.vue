<template>
  <div class="demo-page">
    <h1>示例页面</h1>
    <p>
      这里演示如何在页面中使用自动生成的路由映射文件
      <code>all.router.js</code>。
    </p>

    <section class="router-list">
      <h3>搜索并跳转路由（含“权限”示例）：</h3>
      <div class="search-bar">
        <el-select
          v-model="selectedPath"
          filterable
          clearable
          placeholder="输入关键词搜索路由"
          style="width: 360px"
          @change="onSelect"
        >
          <el-option
            v-for="item in routeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="!item.allow"
          >
            <div class="option-row">
              <span>{{ item.label }}</span>
              <span v-if="!item.allow" class="tag-muted">无权限</span>
            </div>
          </el-option>
        </el-select>
      </div>
    </section>

    <section class="router-list">
      <h3>当前可用的懒加载路由映射：</h3>
      <ul>
        <li v-for="item in routeEntries" :key="item.path">
          <strong>{{ item.path }}</strong>
          <span class="muted"> → 懒加载组件函数</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { ROUTERSDATA } from "@/router/all.router.js";

const router = useRouter();
const selectedPath = ref("");

function deriveRoutePath(key) {
  const segs = key
    .replace("@/views", "")
    .replace("/index.vue", "")
    .split("/")
    .filter(Boolean);
  if (segs.length === 0) return "/";
  return segs.length === 1 ? `/${segs[0]}` : `/${segs[segs.length - 1]}`;
}

// 将映射对象转为数组，便于在页面展示
const routeEntries = computed(() =>
  Object.keys(ROUTERSDATA).map((path) => ({
    path,
    loader: ROUTERSDATA[path],
    key: path,
    routePath: deriveRoutePath(path),
  })),
);

// 从 router 中拿到真实路由与 meta，模拟“权限控制”效果：isPageShow 为 false 的禁用
const routeOptions = computed(() => {
  const routeMap = new Map();
  router.getRoutes().forEach((r) => {
    if (!r.meta?.fullPath) return;
    routeMap.set(r.meta.fullPath, {
      path: r.path,
      name: r.meta?.name || r.name || r.meta?.title || r.path,
      allow: r.meta?.isPageShow !== false,
    });
  });

  return routeEntries.value.map((item) => {
    const metaRoute = routeMap.get(item.routePath) || {};
    const label = `${metaRoute.name || item.routePath} (${metaRoute.path || item.routePath})`;
    return {
      label,
      value: metaRoute.path || item.routePath,
      allow: metaRoute.allow ?? true,
    };
  });
});

function onSelect(val) {
  if (!val) return;
  router.push(val);
}
</script>

<style scoped>
.demo-page {
  padding: 16px;
}

.search-bar {
  margin: 12px 0;
}

.router-list {
  margin-top: 16px;
}

.router-list ul {
  padding-left: 18px;
}

.router-list li {
  margin: 6px 0;
}

.option-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.tag-muted {
  color: #999;
  font-size: 12px;
}

.muted {
  color: #666;
  font-size: 13px;
}
</style>
