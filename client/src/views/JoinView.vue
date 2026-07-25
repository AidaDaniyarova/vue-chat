<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSocket } from "../composables/useSocket";

const username = ref("");
const error = ref("");
const router = useRouter();
const { connectAndJoin } = useSocket();

function join() {
  const name = username.value.trim();
  if (!name) {
    error.value = "Pick a username to continue.";
    return;
  }
  if (name.length > 20) {
    error.value = "Keep it under 20 characters.";
    return;
  }

  connectAndJoin(name, "General");
  router.push({ name: "chat" });
}
</script>

<template>
  <div
    class="flex h-full items-center justify-center bg-gradient-to-br from-white to-slate-100 px-4 dark:from-[#313338] dark:to-[#232428]"
  >
    <div
      class="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl shadow-black/5 dark:bg-[#2b2d31] dark:shadow-black/30"
    >
      <div class="mb-6 text-center">
        <div
          class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5865F2] text-2xl"
        >
          💬
        </div>
        <h1 class="text-xl font-bold text-[#060607] dark:text-white">Welcome to VueChat</h1>
        <p class="mt-1 text-sm text-[#5c5e66] dark:text-[#949ba4]">
          Pick a username to join the conversation.
        </p>
      </div>

      <label class="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#5c5e66] dark:text-[#949ba4]">
        Username
      </label>
      <input
        v-model="username"
        type="text"
        placeholder="e.g. StormRider"
        maxlength="20"
        class="w-full rounded-lg border border-transparent bg-slate-100 px-3 py-2 text-[#060607] outline-none ring-[#5865F2] transition focus:ring-2 dark:bg-[#1e1f22] dark:text-white"
        @keyup.enter="join"
      />
      <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>

      <button
        class="mt-5 w-full rounded-lg bg-[#5865F2] py-2 font-semibold text-white transition hover:scale-[1.02] hover:bg-[#4752c4] active:scale-[0.99]"
        @click="join"
      >
        Join Chat
      </button>

      <p class="mt-4 text-center text-xs text-[#5c5e66] dark:text-[#949ba4]">
        No account needed - your avatar is generated automatically.
      </p>
    </div>
  </div>
</template>
