<script setup>
import { useChatStore } from "../stores/chat";
import { useSocket } from "../composables/useSocket";

defineProps({
  open: { type: Boolean, default: false },
});
const emit = defineEmits(["close"]);

const chat = useChatStore();
const { switchRoom } = useSocket();

const roomIcons = {
  General: "💬",
  Vue: "🖖",
  Gaming: "🎮",
  Random: "🎲",
};

function selectRoom(room) {
  switchRoom(room);
  emit("close");
}
</script>

<template>
  <!-- Backdrop for mobile drawer -->
  <div
    v-if="open"
    class="fixed inset-0 z-20 bg-black/40 lg:hidden"
    @click="emit('close')"
  />

  <aside
    class="z-30 flex w-60 shrink-0 flex-col bg-[#f2f3f5] transition-transform duration-200 dark:bg-[#2b2d31]"
    :class="[
      'fixed inset-y-0 left-0 lg:static lg:translate-x-0',
      open ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <div class="flex h-14 items-center border-b border-black/5 px-4 font-bold text-[#060607] dark:border-white/5 dark:text-white">
      VueChat
    </div>

    <div class="px-3 pt-4">
      <p class="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-[#5c5e66] dark:text-[#949ba4]">
        Text Channels
      </p>

      <nav class="flex flex-col gap-0.5">
        <button
          v-for="room in chat.rooms"
          :key="room"
          class="group flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium transition"
          :class="
            room === chat.currentRoom
              ? 'bg-[#5865F2]/10 text-[#5865F2] dark:bg-white/10 dark:text-white'
              : 'text-[#5c5e66] hover:bg-black/5 hover:text-[#060607] dark:text-[#949ba4] dark:hover:bg-white/5 dark:hover:text-white'
          "
          @click="selectRoom(room)"
        >
          <span>{{ roomIcons[room] || "#" }}</span>
          <span>{{ room }}</span>
        </button>
      </nav>
    </div>

    <div class="mt-auto flex items-center gap-2 border-t border-black/5 px-3 py-3 dark:border-white/5">
      <img
        :src="`https://api.dicebear.com/7.x/thumbs/svg?seed=${chat.username}`"
        :alt="chat.username"
        class="h-8 w-8 rounded-full bg-black/5"
      />
      <span class="truncate text-sm font-medium text-[#060607] dark:text-white">
        {{ chat.username }}
      </span>
    </div>
  </aside>
</template>
