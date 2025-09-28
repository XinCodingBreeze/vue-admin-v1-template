<template>
  <div class="rich-editor">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="{ height: height, overflowY: 'hidden' }"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
    />
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, watch } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

// 定义 props
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "400px",
  },
  placeholder: {
    type: String,
    default: "请输入内容...",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

// 定义 emits
const emit = defineEmits(["update:modelValue", "onChange"]);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");

// 模式
const mode = "simple"; // 或 'simple'

// 工具栏配置
const toolbarConfig = {
  excludeKeys: [
    "group-video", // 排除视频
    "fullScreen", // 排除全屏
  ],
};

// 编辑器配置
const editorConfig = {
  placeholder: props.placeholder,
  readOnly: props.readonly,
  MENU_CONF: {
    // 配置字体
    fontSize: {
      fontSizeList: [
        { name: "12px", value: "12px" },
        { name: "13px", value: "13px" },
        { name: "14px", value: "14px" },
        { name: "16px", value: "16px" },
        { name: "18px", value: "18px" },
        { name: "20px", value: "20px" },
        { name: "24px", value: "24px" },
        { name: "28px", value: "28px" },
        { name: "32px", value: "32px" },
      ],
    },
    // 配置字体族
    fontFamily: {
      fontFamilyList: [
        { name: "Arial", value: "Arial" },
        { name: "Helvetica", value: "Helvetica" },
        { name: "微软雅黑", value: '"Microsoft YaHei", sans-serif' },
        { name: "宋体", value: "SimSun, serif" },
        { name: "黑体", value: "SimHei, sans-serif" },
        { name: "楷体", value: "KaiTi, serif" },
      ],
    },
    // 配置颜色
    fontColor: {
      colors: [
        "#000000",
        "#eeece0",
        "#1c487f",
        "#4d80bf",
        "#c24f4a",
        "#8baa4a",
        "#7b5ba1",
        "#46acc8",
        "#f9963b",
        "#ffffff",
      ],
    },
    // 配置背景色
    bgColor: {
      colors: [
        "#000000",
        "#eeece0",
        "#1c487f",
        "#4d80bf",
        "#c24f4a",
        "#8baa4a",
        "#7b5ba1",
        "#46acc8",
        "#f9963b",
        "#ffffff",
      ],
    },
    // 配置上传图片
    uploadImage: {
      // 自定义上传
      async customUpload(file, insertFn) {
        // 这里可以调用你的图片上传接口
        // 目前先使用base64显示
        const reader = new FileReader();
        reader.onload = function (e) {
          const base64 = e.target.result;
          insertFn(base64, file.name, base64);
        };
        reader.readAsDataURL(file);
      },
    },
  },
};

// 监听外部值变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== valueHtml.value) {
      valueHtml.value = newVal || "";
    }
  },
  { immediate: true },
);

// 监听内部值变化
watch(valueHtml, (newVal) => {
  emit("update:modelValue", newVal);
});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const handleChange = (editor) => {
  emit("onChange", editor.getHtml());
};

const handleDestroyed = () => {
  editorRef.value = null;
};

// 暴露编辑器实例
defineExpose({
  getEditor: () => editorRef.value,
});
</script>

<style lang="scss" scoped>
.rich-editor {
  border: 1px solid #ccc;
  border-radius: 4px;

  :deep(.w-e-text-placeholder) {
    font-style: normal !important;
  }

  :deep(.w-e-text-container) {
    background-color: #fff;
  }

  :deep(.w-e-toolbar) {
    background-color: #fafbfc;
  }
}
</style>
