import { ref } from "vue";

const STORAGE_KEY = "vue-chat-theme";

// Module-scoped ref: every component that calls useTheme() shares the
// same reactive value, so the toggle in the header updates everywhere.
const isDark = ref(true);
let initialized = false;

function applyToDocument(dark) {
  document.documentElement.classList.toggle("dark", dark);
}

export function useTheme() {
  function init() {
    if (initialized) return;
    initialized = true;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      isDark.value = saved === "dark";
    } else {
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    applyToDocument(isDark.value);
  }

  function toggle() {
    isDark.value = !isDark.value;
    localStorage.setItem(STORAGE_KEY, isDark.value ? "dark" : "light");
    applyToDocument(isDark.value);
  }

  return { isDark, init, toggle };
}
