<!--
 * @Author: XinBreeze 19931845446@163.com
 * @Date: 2025-10-09 09:48:44
 * @LastEditors: XinBreeze 19931845446@163.com
 * @LastEditTime: 2025-10-09 09:50:05
 * @FilePath: \vue-admin-v1-template\src\views\error\403\index.vue
 * @Description: 403 禁止访问
-->
<template>
  <div class="error-container common-container">
    <div class="error-card">
      <div class="error-icon-wrapper">
        <el-icon :size="80" class="error-icon">
          <Lock />
        </el-icon>
      </div>
      <div class="error-code">403</div>
      <h2 class="error-title">禁止访问</h2>
      <p class="error-description">
        抱歉，您没有权限访问此页面，请联系管理员获取权限
      </p>
      <div class="error-actions">
        <el-button type="primary" size="large" @click="goHome">
          <el-icon><HomeFilled /></el-icon>
          <span>返回首页</span>
        </el-button>
        <el-button size="large" @click="goBack">
          <el-icon><Back /></el-icon>
          <span>返回上一页</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Lock, HomeFilled, Back } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};

const goBack = () => {
  router.back();
};
</script>

<style scoped lang="scss">
.error-container {
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.error-card {
  text-align: center;
  max-width: 600px;
  width: 100%;
  animation: fadeInUp 0.6s ease-out;
}

.error-icon-wrapper {
  margin-bottom: 24px;

  .error-icon {
    color: #ff4757;
    animation: shake 3s ease-in-out infinite;
  }
}

.error-code {
  font-size: 96px;
  font-weight: 700;
  color: #ff4757;
  line-height: 1;
  margin-bottom: 16px;
  opacity: 0.15;
  animation: slideDown 0.6s ease-out;
}

.error-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.error-description {
  font-size: 16px;
  color: #64748b;
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;

  .el-button {
    min-width: 140px;
    border-radius: 8px;
    font-weight: 500;

    .el-icon {
      margin-right: 6px;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 0.15;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: rotate(0deg);
  }
  10%,
  30% {
    transform: rotate(-2deg);
  }
  20%,
  40% {
    transform: rotate(2deg);
  }
}

@media (max-width: 768px) {
  .error-code {
    font-size: 72px;
  }

  .error-title {
    font-size: 24px;
  }

  .error-description {
    font-size: 14px;
  }

  .error-actions {
    flex-direction: column;
    width: 100%;

    .el-button {
      width: 100%;
    }
  }
}
</style>
