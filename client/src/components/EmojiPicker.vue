<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import "emoji-picker-element";

const emit = defineEmits(["select"]);

const open = ref(false);
const root = ref(null);
const pickerRef = ref(null);

function toggle() {
  open.value = !open.value;
}

function onEmojiClick(event) {
  const emoji = event.detail?.unicode;
  if (emoji) emit("select", emoji);
}

function onClickOutside(event) {
  if (root.value && !root.value.contains(event.target)) {
    open.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});
</script>

<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="rounded-full p-2 text-xl transition hover:bg-black/5 dark:hover:bg-white/5"
      aria-label="Open emoji picker"
      @click="toggle"
    >
      😊
    </button>

    <div
      v-if="open"
      class="absolute bottom-12 right-0 z-40 overflow-hidden rounded-xl border border-black/10 shadow-xl dark:border-white/10"
    >
      <emoji-picker ref="pickerRef" @emoji-click="onEmojiClick"></emoji-picker>
    </div>
  </div>
</template>

<style>
/* emoji-picker-element reads these CSS custom properties for theming */
emoji-picker {
  --num-columns: 8;
  --emoji-size: 1.4rem;
  width: 320px;
  max-width: 80vw;
}
.dark emoji-picker {
  --background: #2b2d31;
  --border-color: rgba(255, 255, 255, 0.1);
  --indicator-color: #5865f2;
  --input-border-color: rgba(255, 255, 255, 0.1);
  --input-font-color: #ffffff;
  --input-placeholder-color: #949ba4;
}
</style>
