import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // emoji-picker-element registers <emoji-picker> as a native
          // custom element - tell Vue not to try to resolve it as a component.
          isCustomElement: (tag) => tag === "emoji-picker",
        },
      },
    }),
    tailwindcss(),
  ],
  server: {
    port: 5173,
  },
});
