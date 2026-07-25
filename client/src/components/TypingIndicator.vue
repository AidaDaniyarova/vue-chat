<script setup>
defineProps({
  username: { type: String, required: true },
});
</script>

<template>
  <div class="flex items-center gap-2 px-2 py-1 text-xs text-[#5c5e66] dark:text-[#949ba4]">
    <span class="flex gap-0.5">
      <span class="typing-dot h-1.5 w-1.5 rounded-full bg-current"></span>
      <span class="typing-dot h-1.5 w-1.5 rounded-full bg-current"></span>
      <span class="typing-dot h-1.5 w-1.5 rounded-full bg-current"></span>
    </span>
    <span>{{ username }} is typing…</span>
  </div>
</template>
