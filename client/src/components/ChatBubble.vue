<script setup>
import { computed } from "vue";

const props = defineProps({
  message: { type: Object, required: true },
  mine: { type: Boolean, default: false },
});

const time = computed(() => {
  const d = new Date(props.message.time);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
});

const avatarUrl = computed(
  () => `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(props.message.username)}`
);
</script>

<template>
  <!-- System messages (join/leave) render as a centered muted line -->
  <div v-if="message.system" class="my-1 text-center text-xs text-[#5c5e66] dark:text-[#949ba4]">
    {{ message.text }}
  </div>

  <div
    v-else
    class="flex items-end gap-2 py-1 transition-all duration-300 ease-out"
    :class="mine ? 'flex-row-reverse' : 'flex-row'"
  >
    <img
      :src="avatarUrl"
      :alt="message.username"
      class="h-8 w-8 shrink-0 rounded-full bg-black/5"
    />

    <div class="flex max-w-[75%] flex-col" :class="mine ? 'items-end' : 'items-start'">
      <div class="mb-0.5 flex items-baseline gap-2 px-1" :class="mine ? 'flex-row-reverse' : 'flex-row'">
        <span class="text-xs font-semibold text-[#060607] dark:text-white">
          {{ mine ? "You" : message.username }}
        </span>
        <span class="text-[10px] text-[#5c5e66] dark:text-[#949ba4]">{{ time }}</span>
      </div>

      <div
        class="whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm shadow-sm transition hover:scale-[1.01]"
        :class="
          mine
            ? 'rounded-br-sm bg-[#5865F2] text-white'
            : 'rounded-bl-sm bg-slate-100 text-[#060607] dark:bg-[#404249] dark:text-[#dbdee1]'
        "
      >
        {{ message.text }}
      </div>
    </div>
  </div>
</template>
