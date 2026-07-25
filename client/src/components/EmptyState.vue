<script setup>
defineProps({
  room: { type: String, required: true },
});
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center gap-2 text-center">
    <span class="text-4xl">👋</span>
    <p class="text-lg font-semibold text-[#060607] dark:text-white">Welcome to #{{ room }}</p>
    <p class="max-w-xs text-sm text-[#5c5e66] dark:text-[#949ba4]">
      Nobody's said anything here yet. Send the first message and get the conversation going.
    </p>
  </div>
</template>
