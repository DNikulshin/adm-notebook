import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  base: "/adm-notebook/",
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",

      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,json,vue,txt,woff,woff2,webmanifest}",
        ],
      },
      injectRegister: "auto",
    }),
  ],
});
