/**
 * ESLint 扁平配置（Flat Config）
 *
 * 从 ESLint 9 开始，使用新的扁平配置格式（eslint.config.js），
 * 取代旧的 .eslintrc.* + .eslintignore 方式。
 *
 * 配置数组中的每一项是一个配置对象，后面的会覆盖前面的，
 * 所以越靠后的配置优先级越高。
 *
 * 参考文档：https://eslint.org/docs/latest/use/configure/configuration-files
 */
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

/**
 * unplugin-auto-import 自动导入的全局变量声明
 *
 * 项目使用了 unplugin-auto-import 插件（见 vite.config.js），
 * 在 <script setup> 中可以直接使用 ref、computed、useRoute 等 API，
 * 无需手动 import。但 ESLint 不知道这些全局变量的存在，
 * 会报 no-undef 错误，所以需要在这里声明为 "readonly"。
 *
 * 此列表需要与 src/auto-imports.d.ts 保持同步。
 * 如果在 vite.config.js 的 AutoImport 配置中新增了导入源，
 * 记得同步更新这里。
 */
const autoImportGlobals = {
  // ===== Vue 核心 API =====
  EffectScope: "readonly",
  computed: "readonly", // 计算属性
  createApp: "readonly", // 创建 Vue 应用
  customRef: "readonly", // 自定义 ref
  defineAsyncComponent: "readonly", // 异步组件
  defineComponent: "readonly", // 定义组件
  effectScope: "readonly", // 副作用作用域
  getCurrentInstance: "readonly", // 获取当前组件实例
  getCurrentScope: "readonly",
  h: "readonly", // 渲染函数
  inject: "readonly", // 依赖注入
  isProxy: "readonly",
  isReactive: "readonly",
  isReadonly: "readonly",
  isRef: "readonly",
  markRaw: "readonly", // 标记为非响应式
  nextTick: "readonly", // DOM 更新后的回调
  // ----- 生命周期钩子 -----
  onActivated: "readonly", // keep-alive 激活
  onBeforeMount: "readonly", // 挂载前
  onBeforeUnmount: "readonly", // 卸载前
  onBeforeUpdate: "readonly", // 更新前
  onDeactivated: "readonly", // keep-alive 失活
  onErrorCaptured: "readonly", // 捕获后代错误
  onMounted: "readonly", // 挂载后
  onRenderTracked: "readonly", // 渲染追踪（仅开发）
  onRenderTriggered: "readonly", // 渲染触发（仅开发）
  onScopeDispose: "readonly",
  onServerPrefetch: "readonly", // SSR 预取
  onUnmounted: "readonly", // 卸载后
  onUpdated: "readonly", // 更新后
  onWatcherCleanup: "readonly",
  // ----- 响应式 API -----
  provide: "readonly", // 依赖提供
  reactive: "readonly", // 深层响应式对象
  readonly: "readonly", // 只读代理
  ref: "readonly", // 响应式引用
  resolveComponent: "readonly",
  shallowReactive: "readonly", // 浅层响应式
  shallowReadonly: "readonly", // 浅层只读
  shallowRef: "readonly", // 浅层 ref
  toRaw: "readonly", // 获取原始对象
  toRef: "readonly", // 转换为 ref
  toRefs: "readonly", // 解构为 ref
  toValue: "readonly", // 获取值
  triggerRef: "readonly", // 强制触发 shallowRef
  unref: "readonly", // 解包 ref
  useAttrs: "readonly",
  useCssModule: "readonly",
  useCssVars: "readonly",
  useId: "readonly",
  useModel: "readonly",
  useSlots: "readonly",
  useTemplateRef: "readonly",
  watch: "readonly", // 侦听器
  watchEffect: "readonly", // 立即执行的侦听器
  watchPostEffect: "readonly", // DOM 更新后执行的侦听器
  watchSyncEffect: "readonly", // 同步执行的侦听器
  // ===== Vue Router API =====
  onBeforeRouteLeave: "readonly", // 路由离开前守卫
  onBeforeRouteUpdate: "readonly", // 路由更新前守卫
  useLink: "readonly", // 路由链接
  useRoute: "readonly", // 当前路由信息（类似 this.$route）
  useRouter: "readonly", // 路由实例（类似 this.$router）
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  /**
   * 全局忽略配置（替代旧的 .eslintignore 文件）
   *
   * 在扁平配置中，ignores 必须放在单独的配置对象中，
   * 且不能包含 files 等其他属性，否则只会作为局部忽略。
   *
   * 注意：*.timestamp-* 是 Vite 热更新产生的临时文件，必须忽略。
   */
  {
    ignores: [
      "node_modules/", // 依赖目录
      "dist/", // 构建产物
      "public/", // 静态资源（不经过构建）
      "docs/", // 文档目录
      "bin/", // 可执行脚本
      "src/mock/", // Mock 数据
      "*.sh", // Shell 脚本
      "*.md", // Markdown 文件
      "*.woff", // 字体文件
      "*.ttf", // 字体文件
      "stats.html", // 构建分析报告
      ".vscode/", // 编辑器配置
      ".idea/", // IDE 配置
      ".husky/", // Git hooks 脚本
      ".local/", // 本地缓存
      "*.timestamp-*", // Vite 热更新临时文件
    ],
  },

  /**
   * 文件匹配范围
   * 只对以下扩展名的文件启用 ESLint 检查
   */
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },

  /**
   * 全局变量声明
   *
   * globals.browser：浏览器环境自带的全局变量（window, document, fetch 等）
   * autoImportGlobals：unplugin-auto-import 注入的 Vue/VueRouter API
   *
   * 声明后 ESLint 就不会对这些变量报 no-undef 错误
   */
  {
    languageOptions: {
      globals: { ...globals.browser, ...autoImportGlobals },
    },
  },

  /**
   * 预设规则集（从上到下，后面的覆盖前面的）
   *
   * pluginJs.configs.recommended  - ESLint 官方推荐规则
   * tseslint.configs.recommended  - TypeScript ESLint 推荐规则
   * pluginVue "flat/essential"    - Vue 3 基础规则（防止常见错误）
   */
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],

  /**
   * Vue 单文件组件专用配置
   *
   * .vue 文件中的 <script> 使用 TypeScript 解析器，
   * 这样 ESLint 才能正确理解 <script setup> 语法、
   * defineProps、defineEmits 等编译宏
   */
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },

  /**
   * CommonJS 配置文件专用配置
   *
   * commitlint.config.cjs、cz.config.cjs 等是 CJS 模块，
   * 使用 module.exports 而非 export default，
   * 需要声明 Node.js 全局变量（module, require, __dirname 等），
   * 否则会报 no-undef 错误
   */
  {
    files: ["**/*.cjs"],
    languageOptions: {
      globals: globals.node,
    },
  },

  /**
   * Vite 配置文件专用配置
   *
   * vite.config.js 虽然是 ESM 格式，但运行在 Node.js 环境，
   * 需要使用 process.cwd() 等 Node.js API，
   * 所以需要声明 Node.js 全局变量
   */
  {
    files: ["vite.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },

  /**
   * ============================
   *    项目自定义规则配置
   * ============================
   *
   * 规则严重级别：
   *   "off"  / 0  ==> 关闭规则
   *   "warn" / 1  ==> 警告（不阻断构建，但在终端中高亮提示）
   *   "error"/ 2  ==> 错误（阻断 lint-staged 提交）
   */
  {
    rules: {
      // ===== 代码风格建议（warn 级别，不阻断提交） =====

      // 建议使用模板字符串代替字符串拼接：`hello ${name}` 而非 "hello " + name
      "prefer-template": 1,

      // 建议使用解构赋值：const { a } = obj 而非 const a = obj.a
      // 仅对对象启用，数组不强制（数组解构有时降低可读性）
      "prefer-destructuring": [1, { object: true, array: false }],

      // 禁止 console（warn 级别）
      // 开发时可以使用，但提交前会提醒清理
      "no-console": "warn",

      // ===== 变量声明规范（error 级别，阻断提交） =====

      // 必须使用 let/const，禁止使用 var（var 有变量提升和作用域问题）
      "no-var": 2,

      // 禁止多余的连续空格（影响代码对齐美观度）
      // ignoreEOLComments: 允许行尾注释前使用多个空格进行对齐
      "no-multi-spaces": [2, { ignoreEOLComments: true }],

      // 禁止重复导入同一模块（应合并为一条 import 语句）
      "no-duplicate-imports": 2,

      // ===== 逻辑正确性（error 级别） =====

      // switch 中的 case 标签不能重复
      "no-duplicate-case": 2,

      // 代码块 {} 中不能为空（空的 if/catch/finally 块通常是遗漏）
      "no-empty": 2,

      // 禁止不必要的函数绑定（.bind() 没有用到 this 时是多余的）
      "no-extra-bind": 2,

      // switch 语句必须有 default 分支（防止遗漏边界情况）
      "default-case": 2,

      // 变量声明时不能初始化为 undefined（let x = undefined 是多余的，let x 即可）
      "no-undef-init": 2,

      // 禁止使用 undefined 作为标识符
      // 应使用 typeof x === "undefined" 或 x == null 进行判断
      "no-undefined": 2,

      // 禁止不必要的三元表达式
      // 错误示例：answer === 1 ? true : false  →  应改为：answer === 1
      "no-unneeded-ternary": 2,

      // 禁止 for 循环中出现方向错误的迭代
      // 错误示例：for (let i = 0; i < 10; i--)  →  i-- 导致死循环
      "for-direction": 2,

      // 禁止与 -0 比较（x === -0 不会按预期工作，应用 Object.is(x, -0)）
      "no-compare-neg-zero": 2,

      // 数组方法（map/filter/reduce 等）的回调函数必须有 return
      "array-callback-return": 2,

      // 限制 var 声明的变量只能在其定义的块作用域中使用
      "block-scoped-var": 2,

      // 禁止重复声明变量（在同一作用域内 let a; let a; 会报错）
      "no-redeclare": "error",

      // ===== 作用域规范（error 级别） =====

      // 禁止内层变量与外层变量同名（变量遮蔽）
      // 例如：函数参数名不能和外层的 const 变量同名
      "no-shadow": 2,

      // 禁止在变量定义之前使用它们
      // 强制 "先声明，后使用" 的代码顺序，提高可读性
      "no-use-before-define": 2,

      // ===== Vue 规则 =====

      // 允许子组件直接修改 props（Element Plus 的 v-model 场景需要）
      "vue/no-mutating-props": "off",

      // 允许单词组件名（如 index.vue、menu.vue，Vue 官方建议多词但实际项目中常用单词）
      "vue/multi-word-component-names": "off",

      // ===== 命名规范 =====

      // 强制驼峰命名法（camelCase）
      // 变量、函数名必须用驼峰：userName 而非 user_name
      camelcase: 2,

      // ===== 代码简洁性 =====

      // if 语句中有 return 后，不允许跟 else
      // 正确示例：if (x) { return a; }  return b;
      // 错误示例：if (x) { return a; } else { return b; }
      "no-else-return": 2,

      // 禁止在 case/default 子句中出现词法声明（let/const/class/function）
      // 如果需要在 case 中声明，必须用 {} 包裹
      "no-case-declarations": 2,
    },
  },

  /**
   * Node.js 构建脚本专用配置（必须放在通用规则之后）
   *
   * src/start/ 目录下的脚本用于自动生成路由文件，
   * 属于构建工具代码，运行在 Node.js 环境。
   * 因为扁平配置中后面的覆盖前面的，
   * 所以这个配置必须在通用 no-console: warn 之后，才能正确覆盖生效
   */
  {
    files: ["src/start/**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "off", // 构建脚本允许 console 输出
    },
  },
];
