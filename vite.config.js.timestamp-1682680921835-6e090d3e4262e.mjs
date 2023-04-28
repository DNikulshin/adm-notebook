// vite.config.js
import { defineConfig } from "file:///C:/Users/nikulshin.d/Desktop/dev/adm-notebook/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/nikulshin.d/Desktop/dev/adm-notebook/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/nikulshin.d/Desktop/dev/adm-notebook/node_modules/vite-plugin-pwa/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2,webmanifest}"]
      },
      injectRegister: "auto"
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxuaWt1bHNoaW4uZFxcXFxEZXNrdG9wXFxcXGRldlxcXFxhZG0tbm90ZWJvb2tcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG5pa3Vsc2hpbi5kXFxcXERlc2t0b3BcXFxcZGV2XFxcXGFkbS1ub3RlYm9va1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbmlrdWxzaGluLmQvRGVza3RvcC9kZXYvYWRtLW5vdGVib29rL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICBWaXRlUFdBKHsgXHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG4gICAgIFxyXG4gICAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgY2xlYW51cE91dGRhdGVkQ2FjaGVzOiB0cnVlLFxyXG4gICAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2Zyxqc29uLHZ1ZSx0eHQsd29mZjIsd2VibWFuaWZlc3R9J10sXHJcbiAgICAgIH0sXHJcbiAgICAgIGluamVjdFJlZ2lzdGVyOiBcImF1dG9cIlxyXG4gICAgIH0pXHJcbiAgXVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFVLFNBQVMsb0JBQW9CO0FBQ2xXLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFDeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BRWQsU0FBUztBQUFBLFFBQ1AsdUJBQXVCO0FBQUEsUUFDdkIsY0FBYyxDQUFDLCtEQUErRDtBQUFBLE1BQ2hGO0FBQUEsTUFDQSxnQkFBZ0I7QUFBQSxJQUNqQixDQUFDO0FBQUEsRUFDSjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
