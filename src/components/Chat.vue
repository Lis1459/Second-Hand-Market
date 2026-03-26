<script setup lang="ts">
import { isChatMessage, type ChatMessage, type Message } from "@/types/chat.types";
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const isOpen = ref(false);
const messages = ref<Message[]>([]);
const newMessage = ref("");
const ws = ref<WebSocket | null>(null);
const messagesContainer = ref<HTMLElement | null>(null);

const openChat = () => {
  isOpen.value = true;
};

const closeChat = () => {
  isOpen.value = false;
};

const sendMessage = () => {
  if (!newMessage.value.trim() || !ws.value) return;

  const message: ChatMessage = {
    type: "message",
    text: newMessage.value.trim(),
  };

  ws.value.send(JSON.stringify(message));
  messages.value.push({ id: Date.now(), text: newMessage.value.trim(), isOwn: true });
  newMessage.value = "";
  scrollToBottom();
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

onMounted(() => {
  ws.value = new WebSocket("wss://ws.ifelse.io");

  ws.value.onopen = () => {
    console.log("WebSocket connected");
  };

  ws.value.onmessage = (event) => {
    const data: unknown = JSON.parse(event.data);
    if (isChatMessage(data)) {
      messages.value.push({ id: Date.now(), text: data.text, isOwn: false });
      scrollToBottom();
    }
  };

  ws.value.onclose = () => {
    console.log("WebSocket disconnected");
  };

  ws.value.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
});

onUnmounted(() => {
  if (ws.value) {
    ws.value.close();
  }
});

// Expose openChat for parent
defineExpose({ openChat });
</script>
<template>
  <div v-if="isOpen" class="chat-container">
    <div class="chat-header">
      <h3>Чат</h3>
      <button @click="closeChat" class="close-btn">×</button>
    </div>
    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="message in messages"
        :key="message.id"
        class="message"
        :class="{ 'message--own': message.isOwn }"
      >
        <span class="message-text">{{ message.text }}</span>
      </div>
    </div>
    <div class="chat-input-group">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Введите сообщение..."
        class="chat-input"
      />
      <button @click="sendMessage" :disabled="!newMessage.trim()" class="chat-input__button">
        Отправить
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  position: fixed;
  right: 20px;
  bottom: 90px;
  width: 300px;
  height: 400px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 8px;
}

.message--own {
  text-align: right;
}

.message-text {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 18px;
  background: #f0f0f0;
  max-width: 80%;
  word-wrap: break-word;
}

.message--own .message-text {
  background: #007bff;
  color: white;
}

.chat-input-group {
  display: flex;
  padding: 10px;
  border-top: 1px solid #eee;
}

.chat-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
}

.chat-input__button {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-input__utton:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
