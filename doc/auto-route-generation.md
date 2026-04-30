# Vue 权限路由配置优化：自动生成路由映射

## 起因

周五快下班，老板过来看权限配置页面。

"这个每次都要手动输路径？"

"对，现在是这样。"我打开给他看：

```
角色：运营专员
路由路径：[手动输入] /user/list
组件路径：[手动输入] @/views/user/List.vue
```

"上次运营配错了，`/user/list` 写成 `/user/lists`，页面打不开找了半天。能不能做个下拉框，直接选？"

我想了想："可以，但得先有个页面列表。"

"那就搞一个，现在页面这么多，手动输容易出错。"

确实，项目现在几十个页面，每次配置权限都要翻代码找路径，复制粘贴，还担心复制错。

## 解决办法

周末琢磨了一下，其实就是缺个"页面清单"。views 目录下都是页面文件，扫描一遍不就有了？

写了个 Node 脚本，自动扫描 `views` 目录，生成路由映射表。配置权限的时候下拉框选，还能搜索。

## 实现

两步：扫描文件 + 生成映射。

### 扫描 .vue 文件

```javascript
function getAllVueFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      getAllVueFiles(filePath, filesList);  // 递归子目录
    } else if (file.endsWith(".vue")) {
      filesList.push(filePath);  // 收集 .vue 文件
    }
  });
  
  return filesList;
}
```

### 生成映射文件

```javascript
function start() {
  const viewsDir = path.resolve(__dirname, "../views");
  let files = getAllVueFiles(viewsDir);
  
  // 兼容 Windows 路径
  files = files.map(item => item.replace(/\\/g, "/"));
  
  // 拼接成 import 映射
  let str = "";
  files.forEach(item => {
    let n = item.replace(/.*src\//, "@/");
    str += `"${n}":()=>import("${n}"),\r\n`;
  });
  
  // 写入文件
  fs.writeFileSync(
    path.resolve(__dirname, "../router/all.router.js"),
    `export const ROUTERSDATA = {\n${str}}`
  );
}
```

最后生成的文件大概是这样：

```javascript
// src/router/all.router.js
export const ROUTERSDATA = {
  "@/views/Home.vue": () => import("@/views/Home.vue"),
  "@/views/About.vue": () => import("@/views/About.vue"),
  "@/views/user/List.vue": () => import("@/views/user/List.vue"),
}
```

## 怎么用

### 权限配置页面

```vue
<template>
  <el-select 
    v-model="selectedRoute" 
    filterable 
    placeholder="搜索并选择页面">
    <el-option
      v-for="(component, path) in ROUTERSDATA"
      :key="path"
      :label="path"
      :value="path">
      {{ path }}
    </el-option>
  </el-select>
</template>

<script setup>
import { ROUTERSDATA } from '@/router/all.router.js'

// 后台返回的权限路由配置
const permissionRoutes = [
  { path: '/user/list', component: '@/views/user/List.vue' },
  { path: '/order/list', component: '@/views/order/List.vue' }
]

// 直接从映射表取组件
const routes = permissionRoutes.map(route => ({
  path: route.path,
  component: ROUTERSDATA[route.component]  // 这里直接用
}))
</script>
```

好处：
- 下拉框自动包含所有页面
- 支持搜索，输入 "user" 就能找到所有用户相关页面
- 新加页面自动出现在列表里

### 动态路由

后台返回权限配置，前端从映射表取组件：

```javascript
function generateRoutes(backendConfig) {
  return backendConfig.map(item => ({
    path: item.path,
    component: ROUTERSDATA[item.component]  // 直接用
  }))
}
```

## 效果

周一把代码提上去，改了权限配置页面：

![效果图占位 - 请将截图保存到 doc/images/route-select-demo.png]

```vue
<!-- 配置页面 -->
<el-select v-model="route" filterable placeholder="搜索页面">
  <el-option 
    v-for="(component, path) in ROUTERSDATA" 
    :key="path" 
    :label="path" 
    :value="path" />
</el-select>
```

老板过来试了一下，在下拉框输入 "user" 就搜到所有用户相关页面。

"嗯，这个好用。新加页面也会自动出现在这里吧？"

"对，每次启动项目会自动扫描。"

"行，那就这样。"

后来发现还有些意外收获：
- 新人看这个映射表就知道项目有哪些页面
- 后台只存路径字符串，数据库干净
- 顺带解决了手动 import 几十个路由的问题

在 `package.json` 加个脚本：

```json
{
  "scripts": {
    "dev": "node src/start/index.js && vite"
  }
}
```

每次 `npm run dev` 会先扫描 views 目录，生成最新的映射表。

## 完整代码

```javascript
// src/start/index.js
const fs = require("fs");
const path = require("path");

function getAllVueFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllVueFiles(filePath, filesList);
    } else if (file.endsWith(".vue")) {
      filesList.push(filePath);
    }
  });

  return filesList;
}

function start() {
  console.log("[自动获取全部可显示页面]");

  const viewsDir = path.resolve(__dirname, "../views");
  let files = getAllVueFiles(viewsDir);

  // 统一路径分隔符，兼容 Windows 反斜杠
  files = files.map((item) => item.replace(/\\/g, "/"));

  let str = "";
  // 构造 import 映射："@/views/xxx.vue": ()=>import("@/views/xxx.vue")
  files.forEach((item) => {
    let n = item.replace(/.*src\//, "@/"); 
    str += `"${n}":()=>import("${n}"),\r\n`;
  });

  const routerFilePath = path.resolve(__dirname, "../router/all.router.js");
  // 将映射写入路由聚合文件，供路由动态引用
  fs.writeFileSync(
    routerFilePath,
    `
    export const ROUTERSDATA = {
    ${str}
    }`,
  );
  console.log("[./src/router/all.router.js 写入]");
}

start();
```

## 注意事项

记得把生成的 `src/router/all.router.js` 加到 `.gitignore`，毕竟是自动生成的文件，没必要提交。

```
# .gitignore
src/router/all.router.js
```

## 后来

用了一个多月，运营配置权限再也没出过错。上周老板说："这个功能不错，其他项目也加上。"

代码其实挺简单的，但确实解决了问题。
