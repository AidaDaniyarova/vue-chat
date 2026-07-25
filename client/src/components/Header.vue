<script setup>
import { useChatStore } from "../stores/chat";
import { useTheme } from "../composables/useTheme";
import { useSocket } from "../composables/useSocket";
import { useRouter } from "vue-router";

defineProps({
  onToggleRooms: { type: Function, default: null },
  onToggleUsers: { type: Function, default: null },
});

const chat = useChatStore();
const { isDark, toggle } = useTheme();
const { disconnect } = useSocket();
const router = useRouter();

function leave() {
  disconnect();
  router.push({ name: "join" });
}
</script>

<template>
  <header
    class="flex h-14 shrink-0 items-center justify-between border-b border-black/5 bg-white px-4 dark:border-white/5 dark:bg-[#313338]"
  >
    <div class="flex items-center gap-2">
      <button
        v-if="onToggleRooms"
        class="mr-1 rounded p-1.5 text-[#5c5e66] hover:bg-black/5 dark:text-[#949ba4] dark:hover:bg-white/5 lg:hidden"
        aria-label="Toggle rooms"
        @click="onToggleRooms"
      >
        ☰
      </button>
      <span class="text-lg font-bold text-[#5865F2]">VueChat</span>
      <span class="hidden text-[#5c5e66] dark:text-[#949ba4] sm:inline">/</span>
      <span class="hidden font-semibold text-[#060607] dark:text-white sm:inline">
        # {{ chat.currentRoom }}
      </span>
    </div>

    <div class="flex items-center gap-3">
      <span class="hidden text-sm text-[#5c5e66] dark:text-[#949ba4] sm:inline">
        Online: {{ chat.onlineCount }}
      </span>

      <button
        class="rounded-full p-2 text-lg transition hover:bg-black/5 dark:hover:bg-white/5"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggle"
      >
        {{ isDark ? "🌙" : "☀️" }}
      </button>

      <button
        v-if="onToggleUsers"
        class="rounded p-1.5 text-[#5c5e66] hover:bg-black/5 dark:text-[#949ba4] dark:hover:bg-white/5 xl:hidden"
        aria-label="Toggle users"
        @click="onToggleUsers"
      >
        👥
      </button>

      <button
        class="rounded-lg bg-black/5 px-3 py-1.5 text-sm font-medium text-[#5c5e66] transition hover:bg-black/10 dark:bg-white/5 dark:text-[#949ba4] dark:hover:bg-white/10"
        @click="leave"
      >
        Leave
      </button>
    </div>
  </header>
</template>
