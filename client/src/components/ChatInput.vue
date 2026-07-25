<script setup>
import { ref } from "vue";
import EmojiPicker from "./EmojiPicker.vue";
import { useSocket } from "../composables/useSocket";
import { useChatStore } from "../stores/chat";

const chat = useChatStore();
const { sendMessage, notifyTyping } = useSocket();

const input = ref("");
const inputEl = ref(null);

function submit() {
  const text = input.value;
  if (!text.trim()) return;
  sendMessage(text);
  input.value = "";
}

function onInput() {
  notifyTyping();
}

function onEmojiSelect(emoji) {
  input.value += emoji;
  inputEl.value?.focus();
}
</script>

<template>
  <div class="shrink-0 border-t border-black/5 bg-white px-3 py-3 dark:border-white/5 dark:bg-[#313338] sm:px-4">
    <div
      class="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 transition focus-within:ring-2 focus-within:ring-[#5865F2] dark:bg-[#383a40]"
    >
      <EmojiPicker @select="onEmojiSelect" />

      <input
        ref="inputEl"
        v-model="input"
        type="text"
        :placeholder="`Message #${chat.currentRoom}`"
        class="min-w-0 flex-1 bg-transparent text-sm text-[#060607] outline-none placeholder:text-[#5c5e66] dark:text-white dark:placeholder:text-[#949ba4]"
        @input="onInput"
        @keyup.enter="submit"
      />

      <button
        class="rounded-lg bg-[#5865F2] px-4 py-1.5 text-sm font-semibold text-white transition hover:scale-105 hover:bg-[#4752c4] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="!input.trim()"
        @click="submit"
      >
        Send
      </button>
    </div>
  </div>
</template>
