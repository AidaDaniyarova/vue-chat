<script setup>
import { ref, watch, nextTick } from "vue";
import { useChatStore } from "../stores/chat";
import ChatBubble from "./ChatBubble.vue";
import TypingIndicator from "./TypingIndicator.vue";
import EmptyState from "./EmptyState.vue";

const chat = useChatStore();
const scrollContainer = ref(null);
const bottom = ref(null);
const showToast = ref(false);
let toastTimer = null;

function scrollToBottom(behavior = "smooth") {
  bottom.value?.scrollIntoView({ behavior });
}

function isNearBottom() {
  const el = scrollContainer.value;
  if (!el) return true;
  return el.scrollHeight - el.scrollTop - el.clientHeight < 120;
}

watch(
  () => chat.messages.length,
  () => {
    const last = chat.messages[chat.messages.length - 1];
    const wasNearBottom = isNearBottom();

    nextTick(() => scrollToBottom(wasNearBottom ? "smooth" : "auto"));

    // Pop a quick toast for messages from other people that arrive
    // while we're scrolled up reading history.
    if (last && !last.system && last.username !== chat.username && !wasNearBottom) {
      showToast.value = true;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => (showToast.value = false), 2000);
    }
  }
);

watch(
  () => chat.currentRoom,
  () => nextTick(() => scrollToBottom("auto"))
);
</script>

<template>
  <div class="relative flex-1 overflow-hidden">
    <div
      v-if="showToast"
      class="toast-enter absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-[#5865F2] px-4 py-1.5 text-xs font-semibold text-white shadow-lg"
    >
      🔔 New message
    </div>

    <div
      ref="scrollContainer"
      class="scrollbar-thin h-full overflow-y-auto px-3 py-3 sm:px-6"
    >
      <EmptyState v-if="chat.messages.length === 0" :room="chat.currentRoom" />

      <ChatBubble
        v-for="message in chat.messages"
        :key="message.id"
        :message="message"
        :mine="message.username === chat.username"
      />

      <TypingIndicator v-if="chat.typingUser" :username="chat.typingUser" />

      <div ref="bottom"></div>
    </div>
  </div>
</template>
