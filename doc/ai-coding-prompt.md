# Vue3 项目 AI 编码提示词

## 项目概述

这是一个基于 Vue 3 + Element Plus + Vite 的现代化前端项目，包含完整的组件库、工具函数、自定义指令和业务逻辑封装。在开发过程中，请优先使用项目中已封装的组件和工具，避免重复造轮子。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **UI库**: Element Plus 2.8.4
- **构建工具**: Vite 5.4.1
- **状态管理**: Pinia 3.0.1
- **路由**: Vue Router 4.4.5
- **HTTP客户端**: Axios 1.8.4
- **样式**: SCSS
- **其他**: Lodash, File-saver, Tesseract.js, WangEditor

## 已封装组件库

### 1. ElementFormPlus 表单组件
**位置**: `src/components/ElementFormPlus/`

这是一个高度封装的动态表单组件，支持多种表单控件类型：

```vue
<template>
  <ElementFormPlus 
    :formList="formConfig" 
    :inline="false"
    ref="formRef"
  />
</template>

<script setup>
import ElementFormPlus from '@/components/ElementFormPlus/index.vue'

const formConfig = {
  formData: {}, // 表单数据
  formRules: {}, // 验证规则
  formConfig: {
    width: '600px',
    labelWidth: '120px',
    btnList: [
      {
        text: '提交',
        type: 'primary',
        click: (formData) => {
          // 提交逻辑
        }
      }
    ]
  },
  formDataType: [
    {
      label: '用户名',
      type: 'input', // 支持的类型见下方
      meta: {
        prop: 'username',
        placeholder: '请输入用户名'
      }
    }
  ]
}
</script>
```

**支持的控件类型**:
- `input`: 输入框 (`src/components/ElementFormPlus/model/inputCom.vue`)
- `select`: 下拉选择 (`src/components/ElementFormPlus/model/selectCom.vue`)
- `timePicker`: 时间选择器 (`src/components/ElementFormPlus/model/dateTimePickerCom.vue`)
- `radio`: 单选框 (`src/components/ElementFormPlus/model/radioCom.vue`)
- `checkbox`: 复选框 (`src/components/ElementFormPlus/model/checkBoxCom.vue`)
- `switch`: 开关 (`src/components/ElementFormPlus/model/switchCom.vue`)
- `upload`: 文件上传 (`src/components/ElementFormPlus/model/uploadCom.vue`)
- `richEditor`: 富文本编辑器 (`src/components/ElementFormPlus/model/richEditorCom.vue`)

### 2. newTable 表格组件
**位置**: `src/components/newTable/index.vue`

封装了 Element Plus 表格的常用功能：

```vue
<template>
  <newTable 
    :tableConfig="tableConfig"
    :data="tableData"
    :loading="loading"
    ref="tableRef"
  />
</template>

<script setup>
import newTable from '@/components/newTable/index.vue'

const tableConfig = {
  border: true,
  selection: {
    show: true,
    width: 55,
    fixed: 'left'
  },
  columns: [
    {
      prop: 'name',
      label: '姓名',
      width: 120,
      align: 'center'
    },
    {
      prop: 'action',
      label: '操作',
      width: 150,
      action: true // 显示操作按钮
    }
  ]
}
</script>
```

### 3. RichEditor 富文本编辑器
**位置**: `src/components/RichEditor/index.vue`

基于 WangEditor 的富文本编辑器组件：

```vue
<template>
  <RichEditor 
    v-model="content"
    :height="'400px'"
    :placeholder="'请输入内容...'"
    @onChange="handleChange"
  />
</template>

<script setup>
import RichEditor from '@/components/RichEditor/index.vue'

const content = ref('')
const handleChange = (html) => {
  console.log('内容变化:', html)
}
</script>
```

### 4. upload-images 图片上传组件
**位置**: `src/components/upload-images/index.vue`

支持单图/多图上传，带图片压缩和预览功能：

```vue
<template>
  <upload-images 
    v-model="imageList"
    :limit="3"
    :type="'image'"
    :mode="2"
  />
</template>

<script setup>
import uploadImages from '@/components/upload-images/index.vue'

const imageList = ref([])
</script>
```

## 工具函数库

### 1. HTTP 请求工具
**位置**: `src/utils/request.js`

已配置好拦截器的 Axios 实例：

```javascript
import request from '@/utils/request'

// GET 请求
const getData = () => request.get('/api/data')

// POST 请求
const postData = (data) => request.post('/api/data', data)
```

**特性**:
- 自动添加 token 到请求头
- 统一错误处理
- 请求/响应数据自动 trim
- 超时时间 8 秒

### 2. Excel 导出工具
**位置**: `src/utils/exportToExcel.js`

支持表格导出为 Excel 文件：

```javascript
import exportToExcel from '@/utils/exportToExcel'

// 导出单个表格
exportToExcel('tableId', 999, '导出文件名')

// 导出多个表格
exportToExcel([
  { eleById: 'table1', title: '表格1' },
  { eleById: 'table2', title: '表格2' }
], 999, '导出文件名')
```

### 3. 主题切换工具
**位置**: `src/utils/useTheme.js`

支持明暗主题切换：

```javascript
import useTheme from '@/utils/useTheme'

const { theme } = useTheme()

// 切换主题
theme.value = 'dark' // 'light' | 'dark' | 'OS'
```

### 4. 其他工具函数
- `src/utils/token.js`: Token 管理
- `src/utils/cookie.js`: Cookie 操作
- `src/utils/data.js`: 数据处理
- `src/utils/downLoad.js`: 文件下载
- `src/utils/tableStyle.js`: 表格样式
- `src/utils/smoothRolling.js`: 平滑滚动
- `src/utils/sokect.js`: WebSocket 连接
- `src/utils/auto-update.js`: 自动更新检查

## 自定义指令

### 1. v-rule 权限指令
**位置**: `src/directives/VRule.js`

用于控制按钮/元素的显示权限：

```vue
<template>
  <el-button v-rule="'shop:create'">创建店铺</el-button>
</template>
```

### 2. v-lazy 懒加载指令
**位置**: `src/directives/VLazy.js`

图片懒加载：

```vue
<template>
  <img v-lazy="imageUrl" alt="图片" />
</template>
```

### 3. v-move 拖拽指令
**位置**: `src/directives/VMove.js`

元素拖拽移动：

```vue
<template>
  <div v-move class="draggable-box">
    <div class="drag-handle">拖拽我</div>
  </div>
</template>
```

## 自定义 Hooks

### usePage 分页 Hook
**位置**: `src/hooks/usePage.js`

封装了分页逻辑的 Hook：

```javascript
import { usePage } from '@/hooks/usePage'

const {
  formData,        // 表格数据
  loading,         // 加载状态
  pageInfo,        // 分页信息
  total,           // 总条数
  queryData,       // 查询条件
  handleGetList,   // 获取列表
  handleLoad,      // 加载数据
  handlePageSizeChange,    // 改变每页条数
  handleCurrentChange,     // 改变当前页
  updateQueryData  // 更新查询条件
} = usePage({
  _apiFun: getListApi,  // API 函数
  _data: {}             // 初始查询数据
})
```

## 图片资源规范

### 占位图片使用
当需要占位图片时，请使用 [Lorem Picsum](https://picsum.photos/) 服务：

```html
<!-- 随机图片 -->
<img src="https://picsum.photos/200/300" alt="随机图片" />

<!-- 指定尺寸的方形图片 -->
<img src="https://picsum.photos/200" alt="方形图片" />

<!-- 特定图片 -->
<img src="https://picsum.photos/id/237/200/300" alt="特定图片" />

<!-- 灰度图片 -->
<img src="https://picsum.photos/200/300?grayscale" alt="灰度图片" />

<!-- 模糊图片 -->
<img src="https://picsum.photos/200/300?blur=2" alt="模糊图片" />

<!-- 组合效果 -->
<img src="https://picsum.photos/id/870/200/300?grayscale&blur=2" alt="组合效果" />
```

### 项目内置图片
项目在 `src/assets/images/` 目录下已包含 6 张示例图片 (1.jpg - 6.jpg)，可在需要时使用。

## 开发规范

### 1. 组件使用优先级
1. **优先使用项目已封装组件** (ElementFormPlus, newTable, RichEditor, upload-images)
2. **其次使用 Element Plus 组件**
3. **最后考虑自定义组件**

### 2. 工具函数使用
- HTTP 请求必须使用 `src/utils/request.js`
- Excel 导出使用 `src/utils/exportToExcel.js`
- 分页逻辑使用 `usePage` Hook
- 主题切换使用 `useTheme` Hook

### 3. 样式规范
- 使用 SCSS 预处理器
- 组件样式使用 `scoped`
- 全局样式放在 `src/assets/styles/` 目录

### 4. 文件结构
```
src/
├── components/     # 公共组件
├── views/         # 页面组件
├── utils/         # 工具函数
├── hooks/         # 自定义 Hooks
├── directives/    # 自定义指令
├── store/         # Pinia 状态管理
├── router/        # 路由配置
└── assets/        # 静态资源
```

### 5. 命名规范
- 组件名使用 PascalCase
- 文件名使用 kebab-case
- 变量名使用 camelCase
- 常量使用 UPPER_SNAKE_CASE

## 常用代码模板

### 页面组件模板
```vue
<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-form :inline="true" :model="queryData" class="search-form">
      <el-form-item label="关键词">
        <el-input v-model="queryData.keyword" placeholder="请输入关键词" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作按钮 -->
    <div class="action-bar">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button type="success" @click="handleExport">导出</el-button>
    </div>

    <!-- 数据表格 -->
    <newTable 
      :tableConfig="tableConfig"
      :data="formData"
      :loading="loading"
      ref="tableRef"
    />

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      :page-sizes="pageInfo.pageSizeArr"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import newTable from '@/components/newTable/index.vue'
import { usePage } from '@/hooks/usePage'
import request from '@/utils/request'
import exportToExcel from '@/utils/exportToExcel'

// 使用分页 Hook
const {
  formData,
  loading,
  pageInfo,
  total,
  queryData,
  handleLoad,
  handlePageSizeChange,
  handleCurrentChange,
  updateQueryData
} = usePage({
  _apiFun: getListApi,
  _data: {}
})

// 表格配置
const tableConfig = ref({
  border: true,
  selection: { show: true },
  columns: [
    { prop: 'name', label: '名称', width: 120 },
    { prop: 'status', label: '状态', width: 100 },
    { prop: 'action', label: '操作', width: 150, action: true }
  ]
})

// API 函数
const getListApi = (params) => request.get('/api/list', { params })

// 搜索
const handleSearch = () => {
  updateQueryData(queryData.value)
}

// 重置
const handleReset = () => {
  queryData.value = {}
  handleLoad(true)
}

// 导出
const handleExport = () => {
  exportToExcel('tableRef', 999, '数据导出')
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
}

.search-form {
  margin-bottom: 20px;
}

.action-bar {
  margin-bottom: 20px;
}
</style>
```

### 表单页面模板
```vue
<template>
  <div class="form-container">
    <ElementFormPlus 
      :formList="formConfig"
      ref="formRef"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ElementFormPlus from '@/components/ElementFormPlus/index.vue'
import request from '@/utils/request'

const formRef = ref()

const formConfig = ref({
  formData: {},
  formRules: {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' }
    ]
  },
  formConfig: {
    width: '600px',
    labelWidth: '120px',
    btnList: [
      {
        text: '提交',
        type: 'primary',
        click: handleSubmit
      },
      {
        text: '重置',
        type: 'default',
        click: handleReset
      }
    ]
  },
  formDataType: [
    {
      label: '名称',
      type: 'input',
      meta: {
        prop: 'name',
        placeholder: '请输入名称'
      }
    },
    {
      label: '状态',
      type: 'select',
      meta: {
        prop: 'status',
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    }
  ]
})

const handleSubmit = async (formData) => {
  try {
    await request.post('/api/submit', formData)
    ElMessage.success('提交成功')
  } catch (error) {
    ElMessage.error('提交失败')
  }
}

const handleReset = (formData, { ruleFormRef }) => {
  ruleFormRef.resetFields()
}
</script>
```

## 注意事项

1. **组件导入**: 所有组件都需要正确导入路径
2. **响应式数据**: 使用 `ref` 和 `reactive` 管理状态
3. **生命周期**: 使用 Composition API 的生命周期钩子
4. **错误处理**: 统一使用 Element Plus 的 Message 组件
5. **性能优化**: 合理使用 `v-memo`、`v-once` 等指令
6. **类型安全**: 虽然使用 JavaScript，但要保持类型一致性

## 快速开始

1. 安装依赖: `npm install`
2. 启动开发服务器: `npm run dev`
3. 构建生产版本: `npm run build`
4. 代码检查: `npm run lint`

遵循以上规范和模板，可以快速开发出高质量、可维护的 Vue 3 应用。