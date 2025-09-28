# Vue3 企业级管理后台模板

一个基于 Vue3、Element Plus 和 Vite 的现代化企业级管理后台开发模板，集成了丰富的业务组件和工具函数。

## 🌟 特性

- 🚀 **现代化技术栈**：基于 Vue3 + Vite + Element Plus 构建，提供极速的开发体验
- 📦 **丰富的UI组件**：集成 Element Plus 完整图标库，提供丰富的组件支持
- 🎯 **智能表单系统**：封装可配置化表单组件，支持多种输入类型和验证规则
- 📊 **高性能表格**：内置可定制表格组件，支持虚拟滚动、Excel导出等功能
- 🤖 **AI功能集成**：内置AI助手和文件识别功能，支持OCR文字识别
- 📝 **富文本编辑器**：集成 wangEditor 富文本编辑器组件
- 🔄 **自动路由生成**：基于文件结构自动生成路由配置，支持嵌套路由
- 🎨 **主题定制系统**：支持动态主题切换和样式定制
- 📱 **响应式布局**：完美适配移动端和各种屏幕尺寸
- 🔧 **完整工具链**：集成 ESLint、Prettier、自动导入等开发工具
- 🗂️ **状态管理**：使用 Pinia 进行状态管理，支持数据持久化
- 📡 **网络请求**：封装 Axios 请求库，支持拦截器和错误处理
- 🎪 **自定义指令**：提供懒加载、拖拽、权限控制等实用指令
- 📈 **性能优化**：支持 Gzip 压缩、代码分割、资源优化

## 🛠️ 技术栈

- **核心框架**：Vue 3.4.37 + Composition API
- **构建工具**：Vite 5.4.1 + 插件生态
- **UI 框架**：Element Plus 2.8.4 + 完整图标库
- **路由管理**：Vue Router 4.4.5 + 自动路由生成
- **状态管理**：Pinia 3.0.1 + 持久化插件
- **网络请求**：Axios 1.8.4 + 拦截器封装
- **富文本编辑**：wangEditor + 自定义配置
- **样式处理**：Sass 1.85.1 + CSS变量
- **工具函数**：Lodash 4.17.21 + 自定义工具集
- **文件处理**：xlsx-js-style + file-saver
- **AI功能**：Tesseract.js (OCR识别)
- **代码规范**：ESLint 9.22.0 + Prettier 3.5.3
- **自动导入**：unplugin-auto-import + TypeScript 声明
- **性能优化**：Gzip压缩 + 代码分割

## 📁 项目结构

```
vue-components-v1-template/
├── src/                        # 源代码目录
│   ├── assets/                # 静态资源文件
│   │   ├── images/           # 图片资源
│   │   ├── styles/           # 全局样式
│   │   │   ├── layout-style.scss  # 布局样式
│   │   │   └── reset.css          # 重置样式
│   │   ├── logo.png          # Logo图片
│   │   └── vue.svg           # Vue图标
│   ├── components/            # 公共组件库
│   │   ├── ElementFormPlus/  # 智能表单组件
│   │   │   ├── index.vue     # 表单主组件
│   │   │   └── model/        # 表单子组件
│   │   │       ├── inputCom.vue        # 输入框组件
│   │   │       ├── selectCom.vue       # 选择器组件
│   │   │       ├── dateTimePickerCom.vue # 日期选择器
│   │   │       ├── radioCom.vue        # 单选框组件
│   │   │       ├── checkBoxCom.vue     # 多选框组件
│   │   │       ├── switchCom.vue       # 开关组件
│   │   │       ├── uploadCom.vue       # 上传组件
│   │   │       └── richEditorCom.vue   # 富文本组件
│   │   ├── newTable/         # 高性能表格组件
│   │   ├── RichEditor/       # 富文本编辑器
│   │   └── upload-images/    # 图片上传组件
│   ├── directives/            # 自定义指令
│   │   ├── index.js          # 指令注册入口
│   │   ├── VLazy.js          # 懒加载指令
│   │   ├── VMove.js          # 拖拽移动指令
│   │   └── VRule.js          # 权限控制指令
│   ├── hooks/                 # 组合式函数
│   │   └── usePage.js        # 分页逻辑Hook
│   ├── layout/               # 布局组件
│   │   ├── index.vue         # 主布局组件
│   │   └── layout-aside/     # 侧边栏组件
│   ├── router/               # 路由配置
│   │   └── index.js          # 自动路由生成
│   ├── store/                # Pinia 状态管理
│   │   ├── index.js          # Store 入口
│   │   └── modules/          # 状态模块
│   │       └── user.js       # 用户状态模块
│   ├── utils/                # 工具函数库
│   │   ├── request.js        # Axios 封装
│   │   ├── exportToExcel.js  # Excel 导出
│   │   ├── auto-update.js    # 自动更新
│   │   ├── useTheme.js       # 主题切换
│   │   ├── token.js          # Token 管理
│   │   ├── cookie.js         # Cookie 操作
│   │   └── ...               # 其他工具函数
│   ├── views/                # 页面视图组件
│   │   ├── login/            # 登录页面
│   │   ├── table/            # 表格相关页面
│   │   │   └── export-excle/ # Excel导出示例
│   │   ├── list/             # 列表页面
│   │   │   └── virtual-list/ # 虚拟列表示例
│   │   ├── aI-helper/        # AI助手页面
│   │   └── file-Identification/ # 文件识别页面
│   ├── config.js             # 应用配置
│   ├── main.js               # 应用入口
│   ├── theme.css             # 主题样式
│   └── auto-imports.d.ts     # 自动导入类型声明
├── public/                    # 静态资源目录
│   └── favicon.ico           # 网站图标
├── .vscode/                   # VSCode 配置
├── vite.config.js            # Vite 构建配置
├── eslint.config.js          # ESLint 代码规范配置
├── .prettierrc               # Prettier 格式化配置
├── .eslintignore             # ESLint 忽略文件
├── .gitignore                # Git 忽略文件
└── package.json              # 项目依赖配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install
```

### 可用脚本命令

```bash
# 开发环境运行 (默认端口3000)
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
```

### 开发环境配置

项目支持多环境配置，通过 `--mode` 参数指定环境：

```bash
# 开发环境 (默认使用 dev 模式)
npm run dev

# 其他环境示例
vite --mode production
vite --mode staging
```

## 📝 核心功能详解

### 1. 🔄 智能路由系统

基于文件结构自动生成路由配置，支持无限层级嵌套：

```javascript
// 目录结构自动映射为路由
views/
  ├── table/              → /table
  │   ├── index.vue       → 表格主页面
  │   ├── page.js         → 路由配置 { name: "表格", icon: "Setting" }
  │   └── export-excle/   → /table/export-excle
  ├── aI-helper/          → /aI-helper (AI助手)
  ├── file-Identification/ → /file-Identification (文件识别)
  └── list/               → /list
      └── virtual-list/   → /list/virtual-list (虚拟列表)
```

**路由配置文件示例 (`page.js`)**：
```javascript
export default {
  name: "表格管理",
  icon: "Setting",
  menuOrder: 1,
};
```

### 2. 🎯 ElementFormPlus 智能表单系统

高度可配置的表单组件，支持多种输入类型：

**支持的组件类型**：
- `input` - 输入框组件
- `select` - 选择器组件  
- `dateTimePicker` - 日期时间选择器
- `radio` - 单选框组件
- `checkbox` - 多选框组件
- `switch` - 开关组件
- `upload` - 文件上传组件
- `richEditor` - 富文本编辑器

**使用示例**：
```vue
<template>
  <ElementFormPlus :formList="formConfig" />
</template>

<script setup>
const formConfig = {
  formData: {
    name: "",
    type: "",
    date: "",
    content: ""
  },
  formDataType: [
    {
      type: "input",
      label: "产品名称",
      meta: {
        prop: "name",
        placeholder: "请输入产品名称",
      },
    },
    {
      type: "select", 
      label: "产品类型",
      meta: {
        prop: "type",
        options: [
          { label: "类型A", value: "a" },
          { label: "类型B", value: "b" }
        ]
      },
    },
    {
      type: "richEditor",
      label: "产品描述", 
      meta: {
        prop: "content",
        height: "300px"
      },
    }
  ],
  formConfig: {
    labelWidth: "120px",
    formStyle: { width: "600px" },
    btnList: [
      { text: "提交", type: "primary", action: "submit" },
      { text: "重置", type: "default", action: "reset" }
    ]
  },
  formRules: {
    name: [{ required: true, message: "请输入产品名称" }]
  }
};
</script>
```

### 3. 📊 NewTable 高性能表格组件

内置可定制表格组件，支持多种高级功能：

**核心特性**：
- ✅ 虚拟滚动支持大数据量
- ✅ Excel 导出功能 (支持样式)
- ✅ 多选功能与状态保持
- ✅ 自定义列配置
- ✅ 动态表格样式
- ✅ 加载状态管理

**使用示例**：
```vue
<template>
  <newTable 
    :data="tableData"
    :tableConfig="tableConfig"
    :loading="loading"
    @selection-change="handleSelectionChange"
  />
</template>
```

### 4. 🤖 AI 功能集成

#### OCR 文字识别
集成 Tesseract.js 实现客户端文字识别：
- 支持多种图片格式 (JPG、PNG、GIF等)
- 多语言识别支持
- 实时识别进度显示
- 识别结果可编辑导出

#### AI 助手功能
提供智能助手界面，可扩展各种AI功能。

### 5. 📝 富文本编辑器

基于 wangEditor 的富文本编辑组件：

**功能特性**：
- 完整的富文本编辑功能
- 图片上传和管理
- 表格编辑支持
- 代码高亮显示
- 全屏编辑模式
- 自定义工具栏配置

**使用方式**：
```vue
<template>
  <RichEditor 
    v-model="content"
    :height="400"
    @change="handleChange"
  />
</template>
```

### 6. 🎪 自定义指令系统

提供实用的自定义指令：

**VLazy (懒加载指令)**：
```vue
<img v-lazy="imageUrl" alt="懒加载图片" />
```

**VMove (拖拽指令)**：
```vue
<div v-move>可拖拽的元素</div>
```

**VRule (权限指令)**：
```vue
<button v-rule="'admin'">管理员按钮</button>
```

### 7. 🔧 工具函数库

**网络请求封装** (`utils/request.js`)：
- Axios 拦截器配置
- 统一错误处理
- Token 自动管理
- 请求/响应日志

**Excel 导出** (`utils/exportToExcel.js`)：
- 支持复杂表格导出
- 自定义样式设置
- 多Sheet支持
- 文件压缩优化

**主题管理** (`utils/useTheme.js`)：
- 动态主题切换
- CSS 变量管理
- 主题持久化存储

### 8. 📱 响应式布局系统

**自适应布局**：
- 移动端友好的侧边栏
- 响应式表格设计
- 弹性网格布局
- 设备适配优化

## 🎨 主题定制与样式配置

### CSS 变量系统

项目使用 CSS 变量实现主题定制，支持动态切换：

```scss
// theme.css
:root {
  --primary-color: #2b5dff;
  --menu-bg: #1a1f37; 
  --header-bg: #ffffff;
  --main-bg: #f8f9fa;
  --text-color: #333333;
  --border-color: #e4e7ed;
}

// 暗黑主题示例
[data-theme="dark"] {
  --menu-bg: #1f1f1f;
  --header-bg: #2d2d2d;
  --main-bg: #121212;
  --text-color: #ffffff;
}
```

### 动态主题切换

使用内置的主题管理工具：

```javascript
import { useTheme } from '@/utils/useTheme'

const { setTheme, currentTheme } = useTheme()

// 切换主题
setTheme('dark') // 'light' | 'dark' | 'auto'
```

### 全局样式配置

**重置样式** (`assets/styles/reset.css`)：
- 标准化浏览器默认样式
- 移除默认边距和内边距
- 统一字体和行高设置

**布局样式** (`assets/styles/layout-style.scss`)：
- 响应式网格系统
- 弹性布局工具类
- 间距和尺寸规范

## 📚 开发指南

### 🔧 新增页面

**步骤 1**：创建页面目录和文件
```bash
src/views/
└── your-page/
    ├── index.vue      # 页面组件
    └── page.js        # 路由配置
```

**步骤 2**：编写页面配置 (`page.js`)
```javascript
export default {
  name: "页面名称",
  icon: "Document",     // Element Plus 图标名
  menuOrder: 1,         // 菜单排序
  hidden: false,        // 是否隐藏菜单
  requireAuth: true,    // 是否需要认证
};
```

**步骤 3**：编写页面组件 (`index.vue`)
```vue
<template>
  <div class="page-container">
    <h1>{{ pageTitle }}</h1>
    <!-- 页面内容 -->
  </div>
</template>

<script setup>
const pageTitle = "我的新页面"
</script>
```

系统会自动扫描并生成路由配置，无需手动配置路由。

### 🎯 使用表单组件

**基础用法**：
```vue
<template>
  <ElementFormPlus 
    :formList="formConfig" 
    @submit="handleSubmit"
    @reset="handleReset"
  />
</template>

<script setup>
const formConfig = reactive({
  formData: {
    name: "",
    email: "",
    type: ""
  },
  formDataType: [
    {
      type: "input",
      label: "用户名",
      meta: {
        prop: "name",
        placeholder: "请输入用户名",
        clearable: true
      }
    }
  ],
  formRules: {
    name: [
      { required: true, message: "请输入用户名", trigger: "blur" }
    ]
  },
  formConfig: {
    labelWidth: "100px",
    btnList: [
      { text: "提交", type: "primary", action: "submit" },
      { text: "重置", type: "default", action: "reset" }
    ]
  }
})

const handleSubmit = (formData) => {
  console.log('提交数据:', formData)
}

const handleReset = () => {
  console.log('重置表单')
}
</script>
```

### 📊 使用表格组件

```vue
<template>
  <newTable 
    :data="tableData"
    :tableConfig="tableConfig"
    :loading="loading"
    @selection-change="handleSelectionChange"
  />
</template>

<script setup>
const tableConfig = {
  border: true,
  selection: {
    show: true,
    reserveSelection: true
  },
  columns: [
    { prop: "name", label: "姓名", width: 120 },
    { prop: "email", label: "邮箱", minWidth: 200 },
    { prop: "status", label: "状态", width: 100 }
  ]
}
</script>
```

### 🔌 网络请求使用

```javascript
import request from '@/utils/request'

// GET 请求
const getUserList = async () => {
  try {
    const response = await request.get('/api/users')
    return response.data
  } catch (error) {
    console.error('获取用户列表失败:', error)
  }
}

// POST 请求
const createUser = async (userData) => {
  return await request.post('/api/users', userData)
}

// 文件上传
const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  return await request.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
```

### 🎪 使用自定义指令

```vue
<template>
  <!-- 懒加载图片 -->
  <img v-lazy="imageUrl" alt="懒加载图片" />
  
  <!-- 可拖拽元素 -->
  <div v-move class="draggable-box">拖拽我</div>
  
  <!-- 权限控制 -->
  <button v-rule="'admin'">管理员功能</button>
  <div v-rule="['admin', 'editor']">编辑权限内容</div>
</template>
```

### 📈 性能优化建议

**1. 路由懒加载**：
```javascript
// 已自动配置，无需手动处理
const component = () => import('@/views/your-page/index.vue')
```

**2. 组件懒加载**：
```vue
<script setup>
// 大组件延迟加载
const HeavyComponent = defineAsyncComponent(() => 
  import('@/components/HeavyComponent.vue')
)
</script>
```

**3. 虚拟列表**：
```vue
<!-- 大数据量列表使用虚拟滚动 -->
<virtual-list 
  :data="largeDataList"
  :item-height="50"
  :visible-count="20"
/>
```

## 🚀 部署指南

### 构建生产版本

```bash
# 构建生产环境
npm run build

# 预览构建结果
npm run preview
```

### 构建优化

项目已内置多种构建优化：

**代码分割**：
- 自动按路由分割代码
- 第三方库单独打包
- 动态导入优化

**资源优化**：
- Gzip 压缩 (压缩率达90%+)
- 图片资源优化
- CSS/JS 文件指纹化

**打包分析**：
```bash
# 分析打包文件大小
npm run build -- --analyze
```

### 环境配置

**开发环境** (`.env.dev`):
```env
VITE_APP_API_URL=http://localhost:8080
VITE_APP_BASE_URL=/
VITE_MODE=dev
```

**生产环境** (`.env.production`):
```env
VITE_APP_API_URL=https://api.yoursite.com
VITE_APP_BASE_URL=/
VITE_MODE=production
```

## 🔧 故障排除

### 常见问题

**Q: 路由不生效？**
A: 确保在 `views` 目录下同时存在 `index.vue` 和 `page.js` 文件

**Q: 表单组件不显示？**
A: 检查 `formDataType` 配置中的 `type` 字段是否正确

**Q: 主题切换无效？**
A: 确认 CSS 变量是否正确定义在 `:root` 中

**Q: Excel 导出失败？**
A: 检查浏览器是否支持 `FileSaver` API

### 开发工具推荐

**VSCode 插件**：

- Vue Language Features (Volar)
- ESLint
- Prettier

**浏览器插件**：

- Vue.js devtools

## 📊 性能监控

### 内置性能优化

**自动更新检测** (`utils/auto-update.js`)：

- 检测新版本发布
- 自动提示用户更新
- 缓存策略优化

**懒加载实现**：
- 图片懒加载指令
- 路由懒加载
- 组件懒加载

**虚拟滚动**：
- 支持大数据量列表渲染
- 内存占用优化
- 滚动性能提升

## 🤝 贡献指南

### 开发流程

1. **Fork 项目**
   ```bash
   git clone https://github.com/your-username/vue-components-v1-template.git
   cd vue-components-v1-template
   npm install
   ```

2. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **开发和测试**
   ```bash
   npm run dev
   npm run lint:fix
   ```

4. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

5. **创建 Pull Request**

### 代码规范

**提交信息格式**：
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**类型说明**：
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建或工具相关

### 开发建议

1. **组件开发**：遵循单一职责原则
2. **样式管理**：使用 CSS 变量和 BEM 命名
3. **类型安全**：合理使用 TypeScript
4. **性能优化**：注意内存泄漏和不必要的重渲染
5. **可访问性**：遵循 WCAG 2.1 标准

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👥 维护者

- **主要维护者**: [Mr.Hao]
- **邮箱**: [19931845446@163.com]
- **GitHub**: [https://github.com/XinCodingBreeze]

## 🙏 致谢

感谢以下开源项目：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Element Plus](https://element-plus.org/) - Vue 3 UI 库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库
- [wangEditor](https://www.wangeditor.com/) - 富文本编辑器

特别感谢所有为本项目贡献代码和建议的开发者们！

---

## 📞 联系我们

如果您在使用过程中遇到问题或有改进建议，欢迎通过以下方式联系：

- 📧 邮箱：[19931845446@163.com]
- 💬 QQ群：[创建QQ群]
- 📱 微信群：[创建微信群]
- 🐛 问题反馈：[GitHub Issues](https://github.com/your-repo/issues)

**⭐ 如果这个项目对您有帮助，请给我们一个 Star！**
