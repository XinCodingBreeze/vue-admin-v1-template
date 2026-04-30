# Vue3 企业级管理后台模板

一个基于 Vue3、Element Plus 和 Vite 的现代化企业级管理后台开发模板，集成了丰富的业务组件和工具函数。

## 特性

- **现代化技术栈**：基于 Vue3 + Vite5 + Element Plus 构建，提供极速的开发体验
- **丰富的 UI 组件**：集成 Element Plus 完整图标库，提供丰富的组件支持
- **智能表单系统**：封装可配置化表单组件，支持多种输入类型和验证规则
- **高性能表格**：内置可定制表格组件，支持虚拟滚动、Excel 导出等功能
- **AI 功能集成**：内置 AI 助手和文件识别功能，支持 OCR 文字识别
- **富文本编辑器**：集成 wangEditor 富文本编辑器组件
- **自动路由生成**：基于文件结构自动生成路由配置，支持嵌套路由
- **主题定制系统**：支持动态主题切换和样式定制
- **完整工程化**：集成 ESLint + Prettier + Husky + Commitlint，代码质量和提交规范全覆盖
- **状态管理**：使用 Pinia 进行状态管理，支持数据持久化
- **网络请求**：封装 Axios 请求库，支持拦截器和错误处理
- **自定义指令**：提供懒加载、拖拽、权限控制等实用指令
- **性能优化**：支持 Gzip 压缩、代码分割、资源优化

## 技术栈

| 类别     | 技术                              | 说明                  |
| -------- | --------------------------------- | --------------------- |
| 核心框架 | Vue 3.4 + Composition API         | `<script setup>` 语法 |
| 构建工具 | Vite 5.4                          | 极速冷启动 + HMR      |
| UI 框架  | Element Plus 2.8                  | 完整图标库            |
| 路由管理 | Vue Router 4.4                    | 基于文件结构自动生成  |
| 状态管理 | Pinia 3.0 + 持久化插件            | 替代 Vuex             |
| 网络请求 | Axios 1.8                         | 拦截器封装            |
| 样式处理 | Sass 1.85 + CSS 变量              | 主题定制              |
| 代码规范 | ESLint 9 (Flat Config) + Prettier | 统一代码风格          |
| 提交规范 | Husky + Commitlint + czg          | 强制规范化 Git 提交   |
| 自动导入 | unplugin-auto-import              | 免手动 import Vue API |
| 文件处理 | xlsx-js-style + file-saver        | Excel 导出            |
| AI 功能  | Tesseract.js                      | OCR 文字识别          |
| 性能优化 | vite-plugin-compression           | Gzip 压缩             |

## 项目结构

```
vue-admin-v1-template/
├── src/
│   ├── api/                    # API 请求层（按模块拆分）
│   │   ├── index.js            # 统一导出入口
│   │   └── user.js             # 用户相关接口
│   ├── assets/                 # 静态资源
│   │   ├── styles/             # 全局样式
│   │   └── logo.png
│   ├── components/             # 公共组件库
│   │   ├── ElementFormPlus/    # 智能表单组件
│   │   │   ├── index.vue       # 表单主组件
│   │   │   └── model/          # 表单子组件（input/select/radio 等）
│   │   ├── newTable/           # 高性能表格组件
│   │   ├── RichEditor/         # 富文本编辑器
│   │   └── upload-images/      # 图片上传组件
│   ├── constants/              # 全局常量
│   │   ├── index.js            # 统一导出
│   │   ├── storage.js          # localStorage Key 常量
│   │   └── http.js             # HTTP 相关常量
│   ├── directives/             # 自定义指令
│   │   ├── index.js            # 指令注册入口
│   │   ├── VLazy.js            # 图片懒加载指令
│   │   ├── VMove.js            # 拖拽移动指令
│   │   └── VRule.js            # 权限控制指令
│   ├── hooks/                  # 组合式函数
│   │   └── usePage.js          # 分页逻辑 Hook
│   ├── layout/                 # 布局组件
│   │   ├── index.vue           # 主布局
│   │   └── layout-aside/       # 侧边栏
│   ├── router/                 # 路由配置
│   │   ├── index.js            # 自动路由生成
│   │   └── all.router.js       # 自动生成的路由映射（勿手动编辑）
│   ├── start/                  # 构建脚本
│   │   └── index.js            # 自动扫描 views 生成路由文件
│   ├── store/                  # Pinia 状态管理
│   │   ├── index.js
│   │   └── modules/user.js
│   ├── utils/                  # 工具函数库
│   │   ├── request.js          # Axios 封装
│   │   ├── exportToExcel.js    # Excel 导出
│   │   ├── auto-update.js      # 版本更新检测
│   │   ├── useTheme.js         # 主题切换
│   │   ├── token.js            # Token 管理
│   │   ├── cookie.js           # Cookie 操作
│   │   ├── socket.js           # WebSocket 封装
│   │   └── data.js             # 数据处理工具
│   ├── views/                  # 页面视图
│   │   ├── login/              # 登录页面
│   │   ├── ai-helper/          # AI 助手
│   │   ├── file-identification/# 文件识别（OCR）
│   │   ├── demo/               # 示例页面
│   │   ├── table/              # 表格页面
│   │   ├── list/               # 列表页面
│   │   └── error/              # 错误页面（403/404/500）
│   ├── main.js                 # 应用入口
│   ├── config.js               # 应用配置
│   ├── theme.css               # 主题样式变量
│   └── auto-imports.d.ts       # 自动导入类型声明（自动生成）
├── .husky/                     # Git Hooks
│   ├── pre-commit              # 提交前运行 lint-staged
│   └── commit-msg              # 提交信息规范校验
├── .editorconfig               # 编辑器统一配置
├── .env                        # 默认环境变量
├── .env.dev                    # 开发环境变量
├── .env.production             # 生产环境变量
├── vite.config.js              # Vite 构建配置
├── eslint.config.js            # ESLint 扁平配置（含详细中文注释）
├── .prettierrc                 # Prettier 格式化配置
├── commitlint.config.cjs       # Git 提交信息规范配置
├── cz.config.cjs               # 交互式提交工具配置（中文提示）
└── package.json                # 项目依赖和脚本
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 可用脚本命令

```bash
# 开发环境运行
npm run dev

# 生产环境构建
npm run build

# 预览生产构建
npm run preview

# 自动生成路由文件
npm run router

# 代码检查
npm run lint

# 代码检查并自动修复
npm run lint:fix

# 交互式规范提交（中文提示）
npm run commit
```

### 环境配置

项目支持多环境配置：

| 文件              | 用途                        | VITE_APP_DEV 值 |
| ----------------- | --------------------------- | --------------- |
| `.env`            | 默认配置                    | `env`           |
| `.env.dev`        | 开发环境（`npm run dev`）   | `dev`           |
| `.env.production` | 生产环境（`npm run build`） | `production`    |

当 `VITE_APP_DEV === 'dev'` 时，request.js 使用本地代理（baseURL 为空），否则使用 `VITE_APP_API_URL` 作为接口地址。

## Git 提交规范

项目集成了完整的 Git 提交规范工具链：

### 提交流程

```bash
# 方式一：使用交互式提交工具（推荐）
npm run commit

# 方式二：手动提交（需符合规范，否则会被 commitlint 拦截）
git commit -m "feat: 添加用户管理功能"
```

### 提交类型

| 类型       | 说明                     |
| ---------- | ------------------------ |
| `feat`     | 新功能                   |
| `fix`      | 修复 Bug                 |
| `docs`     | 文档变更                 |
| `style`    | 代码格式（不影响功能）   |
| `refactor` | 重构（非新功能、非修复） |
| `perf`     | 性能优化                 |
| `test`     | 测试相关                 |
| `build`    | 构建系统或外部依赖变更   |
| `ci`       | CI/CD 配置变更           |
| `chore`    | 其他杂项                 |
| `revert`   | 回退提交                 |

### 工具链说明

| 工具            | 作用                                                   | 配置文件                             |
| --------------- | ------------------------------------------------------ | ------------------------------------ |
| **Husky**       | Git Hooks 管理，在 commit 时自动触发检查               | `.husky/`                            |
| **lint-staged** | 只对暂存文件运行 ESLint/Prettier                       | `package.json` 中 `lint-staged` 字段 |
| **Commitlint**  | 校验 commit message 是否符合 Conventional Commits 规范 | `commitlint.config.cjs`              |
| **czg**         | 交互式中文提交提示工具，引导填写规范的 commit message  | `cz.config.cjs`                      |

## 核心功能

### 1. 智能路由系统

基于文件结构自动生成路由配置，支持无限层级嵌套：

```
views/
  ├── table/                → /table
  │   ├── index.vue         → 页面组件
  │   ├── page.js           → 路由配置 { name, icon, menuOrder }
  │   └── export-excle/     → /table/export-excle（子路由）
  ├── ai-helper/            → /ai-helper
  ├── file-identification/  → /file-identification
  └── list/                 → /list
      └── virtual-list/     → /list/virtual-list
```

**路由配置文件 (`page.js`)**：

```javascript
export default {
  name: "页面名称", // 菜单显示名称
  icon: "Setting", // Element Plus 图标名
  menuOrder: 1, // 菜单排序（数字越小越靠前）
  isPageShow: true, // 是否在菜单中显示
};
```

### 2. API 请求层

所有接口统一在 `src/api/` 目录管理，按业务模块拆分：

```javascript
// src/api/user.js
import request from "@/utils/request";

export const login = (data) => {
  return request({ url: "/api/auth/login", method: "post", data });
};

// 页面中使用
import { login } from "@/api";
const res = await login({ username, password });
```

### 3. ElementFormPlus 智能表单

高度可配置的表单组件，支持 input / select / radio / checkbox / switch / upload / richEditor 等类型：

```vue
<template>
  <ElementFormPlus :formList="formConfig" />
</template>

<script setup>
const formConfig = {
  formData: { name: "", type: "" },
  formDataType: [
    {
      type: "input",
      label: "名称",
      meta: { prop: "name", placeholder: "请输入" },
    },
    {
      type: "select",
      label: "类型",
      meta: {
        prop: "type",
        options: [
          { label: "类型A", value: "a" },
          { label: "类型B", value: "b" },
        ],
      },
    },
  ],
  formConfig: {
    labelWidth: "120px",
    formStyle: { width: "600px" },
    btnList: [
      {
        text: "提交",
        type: "primary",
        action: "submit", // action 字段决定按钮行为
        click: (formData) => {
          /* 处理提交 */
        },
      },
      {
        text: "重置",
        type: "default",
        action: "reset",
        click: (formData, { ruleFormRef }) => {
          ruleFormRef.value.resetFields();
        },
      },
    ],
  },
  formRules: {
    name: [{ required: true, message: "请输入名称" }],
  },
};
</script>
```

### 4. 自定义指令

```vue
<template>
  <!-- 图片懒加载：进入视口时才加载 -->
  <img v-lazy="imageUrl" />

  <!-- 拖拽移动 -->
  <div v-move>可拖拽的元素</div>

  <!-- 权限控制：无权限时自动移除元素 -->
  <button v-rule="'admin'">管理员按钮</button>
</template>
```

### 5. 常量管理

避免硬编码，集中管理全局常量：

```javascript
import { STORAGE_KEYS, HTTP_STATUS } from "@/constants";

localStorage.getItem(STORAGE_KEYS.TOKEN);

if (res.code === HTTP_STATUS.UNAUTHORIZED) {
  // 处理未授权
}
```

## 新增页面指南

1. 在 `src/views/` 下创建目录，包含 `index.vue` 和 `page.js`
2. 运行 `npm run router` 重新生成路由映射
3. 页面自动出现在侧边栏菜单中

```bash
src/views/
└── your-page/
    ├── index.vue      # 页面组件
    └── page.js        # 路由配置
```

```javascript
// page.js
export default {
  name: "我的页面",
  icon: "Document",
  menuOrder: 5,
  isPageShow: true,
};
```

## 部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

构建产物在 `dist/` 目录，已内置 Gzip 压缩和代码分割优化。

部署前请修改 `.env.production` 中的 `VITE_APP_API_URL` 为实际的后端接口地址。

## ESLint 配置说明

项目使用 ESLint 9 扁平配置格式，配置文件 `eslint.config.js` 中包含详细的中文注释，涵盖：

- **auto-import 全局变量声明**：与 `unplugin-auto-import` 同步，避免 `no-undef` 误报
- **文件级覆盖**：CJS 配置文件、Vite 配置、构建脚本分别配置对应的环境变量
- **规则分类注释**：每条规则都有中文说明，包括含义、示例和启用原因

## 开发工具推荐

**VSCode 插件**：

- Vue - Official (Volar)
- ESLint
- Prettier - Code formatter
- EditorConfig for VS Code

**浏览器插件**：

- Vue.js devtools

## 维护者

- **主要维护者**: Mr.Hao
- **邮箱**: 19931845446@163.com
- **GitHub**: [XinCodingBreeze](https://github.com/XinCodingBreeze)

## 许可证

[MIT](LICENSE)
