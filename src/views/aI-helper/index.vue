<template>
  <div class="ai-chat-container">
    <div class="chat-header">
      <h2>AI 助手</h2>
    </div>
    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="[
          'message',
          message.role === 'user' ? 'user-message' : 'ai-message',
        ]"
      >
        <el-avatar
          :size="36"
          :icon="message.role === 'user' ? 'User' : 'Service'"
          :class="message.role === 'user' ? 'user-avatar' : 'ai-avatar'"
        />
        <div class="message-content" ref="markdownRef">
          {{ message.content }}
        </div>
      </div>
    </div>

    <div class="chat-input">
      <el-input
        v-model="userInput"
        type="textarea"
        :rows="3"
        placeholder="6-..."
        @keyup.enter.ctrl="sendMessage"
        resize="none"
      />
      <el-button
        type="primary"
        :loading="loading"
        @click="sendMessage"
        class="send-button"
      >
        <el-icon><Position /></el-icon>
        发送
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { Position } from "@element-plus/icons-vue";

const apiKey = "54266d562e4a4b2cbdb6b69933b1ea96.aDZqhAhDwDIQJ9eq"; // 替换为实际的API Key
const deepSeekUrl = "https://open.bigmodel.cn/api/paas/v4/chat/completions"; // DeepSeek API地址

const messages = ref([]);
const userInput = ref("");
const loading = ref(false);
const messagesContainer = ref(null);
const markdownRef = ref(null);

axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// 发送消息
const sendMessage = async () => {
  if (!userInput.value.trim()) {
    ElMessage.warning("请输入内容");
    return;
  }

  const userMessage = {
    role: "user",
    content: userInput.value,
  };

  messages.value.push(userMessage);
  userInput.value = "";
  loading.value = true;

  try {
    const response = await axios.post(deepSeekUrl, {
      model: "glm-4",
      messages: [userMessage],
    });

    const aiMessage = {
      role: "assistant",
      content: response.data.choices[0].message.content,
    };

    messages.value.push(aiMessage);
  } catch (error) {
    ElMessage.error("发送消息失败：" + error.message);
  } finally {
    loading.value = false;
    scrollToBottom();
  }
};

onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped lang="scss">
.ai-chat-container {
  height: calc(100vh - 260px);
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  .chat-header {
    padding: 16px 24px;
    background: linear-gradient(135deg, #409eff 0%, #36cfc9 100%);
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
    }
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    background-color: #f8f9fa;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #dcdfe6;
      border-radius: 3px;
    }

    .message {
      display: flex;
      margin-bottom: 24px;
      gap: 12px;
      align-items: flex-start;

      .message-content {
        max-width: 70%;
        padding: 12px 16px;
        border-radius: 12px;
        word-break: break-word;
        line-height: 1.5;
        font-size: 14px;
      }
    }

    .user-message {
      flex-direction: row-reverse;

      .user-avatar {
        background-color: #409eff;
      }

      .message-content {
        background: linear-gradient(135deg, #409eff 0%, #36cfc9 100%);
        color: white;
        border-top-right-radius: 4px;
      }
    }

    .ai-message {
      .ai-avatar {
        background-color: #36cfc9;
      }

      .message-content {
        background-color: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        border-top-left-radius: 4px;
      }
    }
  }

  .chat-input {
    display: flex;
    gap: 12px;
    padding: 20px;
    background-color: white;
    border-top: 1px solid #ebeef5;

    .el-input {
      flex: 1;

      :deep(.el-textarea__inner) {
        border-radius: 8px;
        padding: 12px;
        font-size: 14px;
        resize: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        border: 1px solid #e4e7ed;
        transition: all 0.3s ease;

        &:focus {
          border-color: #409eff;
          box-shadow: 0 2px 12px rgba(64, 158, 255, 0.1);
        }
      }
    }

    .send-button {
      align-self: flex-end;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
      }

      .el-icon {
        margin-right: 4px;
      }
    }
  }
}
</style>
