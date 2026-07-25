import { createRouter, createWebHistory } from "vue-router";
import { useChatStore } from "../stores/chat";

const routes = [
  {
    path: "/",
    name: "join",
    component: () => import("../views/JoinView.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("../views/ChatView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const chat = useChatStore();

  if (to.name === "chat" && !chat.username) {
    return { name: "join" };
  }
  if (to.name === "join" && chat.username) {
    return { name: "chat" };
  }
  return true;
});

export default router;
