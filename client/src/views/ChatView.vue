<script setup>
import { ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import UsersSidebar from "../components/UsersSidebar.vue";
import Header from "../components/Header.vue";
import ChatWindow from "../components/ChatWindow.vue";
import ChatInput from "../components/ChatInput.vue";

const roomsOpen = ref(false);
const usersOpen = ref(false);
</script>

<template>
  <div class="flex h-full">
    <Sidebar :open="roomsOpen" @close="roomsOpen = false" />

    <div class="flex min-w-0 flex-1 flex-col">
      <Header
        :on-toggle-rooms="() => (roomsOpen = !roomsOpen)"
        :on-toggle-users="() => (usersOpen = !usersOpen)"
      />
      <ChatWindow />
      <ChatInput />
    </div>

    <UsersSidebar :open="usersOpen" @close="usersOpen = false" />
  </div>
</template>
