<template>
  <div class="upload-container">
    <div v-if="type == 'image'" class="image-container">
      <el-upload
        v-if="!isShowImage"
        ref="upload"
        v-model:file-list="fileList"
        list-type="picture-card"
        :action="FILE_URL"
        :on-remove="handleRemove"
        :name="name"
        :limit="limit"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :on-exceed="handleExceed"
        :on-preview="handlePictureCardPreview"
        :disabled="isShowImage"
        :before-upload="beforeUpload"
        accept="image/*"
        :multiple="limit > 1"
        :show-file-list="limit > 1"
      >
        <el-image
          v-if="imageUrl && imageUrl.length > 0"
          :src="imageUrl"
          class="avatar"
          fit="cover"
        />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>

      <div v-else class="image-list">
        <!-- @click="handlePictureCardPreview(item)" -->
        <el-image
          v-for="(item, index) in fileList"
          :preview-src-list="_fileList"
          :hide-on-click-modal="true"
          :initial-index="index"
          :key="item.url"
          :src="item.url"
          class="avatar"
          fit="cover"
        >
          <!-- 插槽在test.md中 -->
        </el-image>
      </div>
      <!-- 添加图片编辑器组件 -->
      <ImageEditor
        v-model="showEditor"
        :image-url="currentEditImage"
        @save="handleSaveEdit"
      />

      <div class="tip" v-if="limit == 1">
        仅支持上传<span class="red">jpg、png、jepg、bmp、SVG</span>格式的图片
      </div>
    </div>
    <div v-else-if="type == 'file'" class="file-container">
      <el-upload
        class="upload-demo"
        :action="FILE_URL"
        :name="name"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :on-exceed="handleExceed"
        multiple
        :limit="3"
        v-model:file-list="fileList"
      >
        <el-button type="primary">{{ buttonText }}</el-button>
        <!-- <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div> -->
      </el-upload>
    </div>
  </div>

  <el-dialog v-model="dialogVisible">
    <el-image :src="dialogImageUrl" alt="Preview Image" style="width: 100%" />
  </el-dialog>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { nextTick, onMounted, ref, watch, computed } from "vue";
import ImageEditor from "./imageEditor/index.vue";
import Compressorjs from "compressorjs";
const props = defineProps({
  modelValue: {
    default: () => "",
    type: Array || String,
  },
  // 模式 1:string,string 2:string[]
  mode: {
    default: 2,
    type: Number,
  },
  limit: {
    default: 1,
    type: Number,
  },
  name: {
    default: "uploadFile",
    type: String,
  },
  isShowImage: {
    default: false,
    type: Boolean,
  },
  // 区分图片和文件
  type: {
    default: "image",
    type: String,
  },
  // 上传文件的按钮名字
  buttonText: {
    default: "上传图片",
    type: String,
  },
});

const _fileList = computed(() => {
  return fileList.value.map((item) => {
    return item.url;
  });
});

const emit = defineEmits(["update:modelValue"]);
const FILE_URL = "/file/uploadFile";
const fileList = ref([]);
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
  handleEmit();
};
const handleExceed = () => {
  ElMessage({
    message: "超出上传数量限制",
    type: "error",
  });
};
const showEditor = ref(false);
// 修改编辑处理函数
const currentEditImage = ref("");
const handleEdit = (item) => {
  currentEditImage.value = item.url;
  showEditor.value = true;
};

const handleSaveEdit = (imageData) => {
  console.log(imageData, "imageData");
};
watch(
  () => props.modelValue,
  () => {
    handleInit();
  },
);
const handleInit = () => {
  let v = props.modelValue;
  let arr = [];

  if (props.mode == 1) {
    if (v == null || v == undefined) {
      v = "";
    }
    arr = v.split(",");
  } else {
    console.log(2222);

    if (v == null || v == undefined) {
      v = [];
    }
    arr = v;
  }
  if (arr && props.limit > 1) {
    arr = arr.filter((item) => {
      return item;
    });
    fileList.value = arr.map((item) => {
      return {
        url: item,
        name: item,
      };
    });
  } else {
    imageUrl.value = arr;
  }
};

/**
 * 处理
 */
const handleEmit = () => {
  nextTick(() => {
    let value = null;
    if (props.limit > 1) {
      value = fileList.value
        .filter((item) => {
          return item.status == "success" || !item.status;
        })
        .map((item) => {
          return item.response ? item.response.entity.fileUrl : item.url;
        });
      if (props.mode == 1) {
        value = value.join(",");
      }
    } else {
      value = value = imageUrl.value;
    }
    console.log(value);
    emit("update:modelValue", value);
  });
};
const imageUrl = ref("");
const handleSuccess = (response, file, fileList) => {
  console.log("handleSuccess:", response, file, fileList);
  if (props.limit == 1) {
    imageUrl.value = response.entity.fileUrl;
    handleEmit();
    return;
  }

  console.log(fileList.map((item) => item.status));
  let len = fileList
    .map((item) => {
      return item.status ? item.status : "success";
    })
    .filter((item) => {
      return item == "success";
    }).length;
  if (len == fileList.length) {
    handleEmit();
  }
};

const beforeUpload = async (file) => {
  console.log(file, "fielfllfelel");
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    ElMessage.error("只能上传图片文件!");
    return;
  }
  try {
    const compressedFile = await handlerCompressorjs(file);
    return compressedFile;
  } catch (e) {
    ElMessage.error("图片压缩失败");
    return false;
  }
};

const handlerCompressorjs = (file) => {
  return new Promise((resolve, reject) => {
    new Compressorjs(file, {
      quality: 0.4,
      // 所有图片都压缩
      convertTypes: [
        "image/png",
        "image/webp",
        "image/jpeg",
        "image/gif",
        "image/svg+xml",
        "image/gif",
      ],
      convertSize: 2 * 1024 * 1024,
      success: (compressedFile) => {
        resolve(compressedFile);
      },
      error: (e) => {
        console.log("压缩失败");
        console.log(e);
        reject(e);
      },
    });
  });
};

// const handleChange = () => {
//   console.log("change[=================]");
//   handleEmit();
// }
onMounted(() => {
  console.log("[upload image]");
  console.log(props.modelValue);
  handleInit();
});

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const handlePictureCardPreview = (uploadFile) => {
  console.log("打开了");

  dialogImageUrl.value = uploadFile.url;
  if (!props.isShowImage) {
    dialogVisible.value = true;
  }
};

// 计算limit 如果等于1的话就false 反之就返回limit
const limit = computed(() => {
  return props.limit == 1 ? false : props.limit;
});
</script>
<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.image-list {
  width: 100%;
  display: grid;
  // 平均分布
  grid-template-columns: repeat(auto-fill, minmax(178px, 1fr));
  grid-template-rows: 178px;
  grid-gap: 10px;
  .avatar {
    cursor: pointer;
  }
}
</style>

<style lang="scss" scoped>
.upload-container {
  display: flex;
  .image-container {
    width: 100%;
    display: flex;
  }
}
.avatar {
  width: 100%;
  height: 100%;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.el-upload.is-disabled {
  display: none;
}

.tip {
  margin-top: 10px;
  font-size: 12px;
  color: #999999;
  .red {
    color: #f56c6c;
  }
}

// 图片预览
:deep(.el-image-viewer__close) {
  font-size: 40px;
  height: 80px;
  width: 80px;
}
:deep(.el-image-viewer__next) {
  height: 80px;
  width: 80px;
  font-size: 40px;
}
:deep(.el-image-viewer__prev) {
  height: 80px;
  width: 80px;
  font-size: 40px;
}

// 底部按钮
:deep(.el-image-viewer__actions) {
  height: 80px;
  width: 450px;
  .el-image-viewer__actions__inner {
    font-size: 50px;
  }
}
</style>
