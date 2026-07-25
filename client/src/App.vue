<script setup>
import { onMounted } from "vue";
import { useSocket } from "./composables/useSocket";
import { useTheme } from "./composables/useTheme";

const { init: initSocket } = useSocket();
const { init: initTheme } = useTheme();

onMounted(() => {
  initSocket();
  initTheme();
});
</script>

<template>
  <div class="h-full bg-white text-[#060607] dark:bg-[#313338] dark:text-white">
    <router-view />
  </div>
</template>
