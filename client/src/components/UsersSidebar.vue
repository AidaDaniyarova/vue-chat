<script setup>
import { useChatStore } from "../stores/chat";

defineProps({
  open: { type: Boolean, default: false },
});
const emit = defineEmits(["close"]);

const chat = useChatStore();
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-20 bg-black/40 xl:hidden"
    @click="emit('close')"
  />

  <aside
    class="z-30 w-60 shrink-0 overflow-y-auto bg-[#f2f3f5] px-3 py-4 transition-transform duration-200 dark:bg-[#2b2d31]"
    :class="[
      'fixed inset-y-0 right-0 xl:static xl:translate-x-0',
      open ? 'translate-x-0' : 'translate-x-full',
    ]"
  >
    <p class="mb-3 px-2 text-xs font-bold uppercase tracking-wide text-[#5c5e66] dark:text-[#949ba4]">
      Online - {{ chat.users.length }}
    </p>

    <ul class="flex flex-col gap-1">
      <li
        v-for="user in chat.users"
        :key="user.id"
        class="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
      >
        <div class="relative">
          <img
            :src="`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`"
            :alt="user.username"
            class="h-8 w-8 rounded-full bg-black/5"
          />
          <span
            class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#f2f3f5] bg-emerald-500 dark:border-[#2b2d31]"
          />
        </div>
        <span
          class="truncate text-sm font-medium"
          :class="
            user.username === chat.username
              ? 'text-[#5865F2]'
              : 'text-[#060607] dark:text-white'
          "
        >
          {{ user.username }}{{ user.username === chat.username ? " (you)" : "" }}
        </span>
      </li>
    </ul>
  </aside>
</template>
