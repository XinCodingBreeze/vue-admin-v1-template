// vite.config.js
import { defineConfig, loadEnv } from "file:///D:/A_project_me/vue-admin-v1-template/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/A_project_me/vue-admin-v1-template/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/A_project_me/vue-admin-v1-template/node_modules/unplugin-auto-import/dist/vite.js";
import viteCompression from "file:///D:/A_project_me/vue-admin-v1-template/node_modules/vite-plugin-compression/dist/index.mjs";
var vite_config_default = ({ command, mode }) => {
  console.log(command, mode, "command, mode");
  let PropxUrl = loadEnv(mode, process.cwd()).VITE_APP_API_URL;
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router"],
        dts: "src/auto-imports.d.ts"
      }),
      viteCompression({
        threshold: 1024 * 20,
        algorithm: "gzip",
        ext: ".gz",
        compressionOptions: {
          level: 9
          // 压缩级别，范围为 1-9，9 为最高压缩率
        }
        // filter: /\.(js|css|html|json)$/i, // 仅压缩 JavaScript、CSS、HTML 和 JSON 文件
      })
    ],
    build: {
      rollupOptions: {
        output: {
          // 入口文件输出的命名模式
          entryFileNames: "js/[name]-[hash].js",
          // 代码分割后的chunk文件命名模式
          chunkFileNames: "js/[name]-[hash].js",
          // 根据不同资源类型自定义输出路径和文件名
          assetFileNames(assetInfo) {
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];
            if (ext === "css") {
              return "css/[name]-[hash].css";
            }
            const imgExts = ["png", "jpg", "jpeg", "gif", "ico", "svg", "webp"];
            if (imgExts.includes(ext)) {
              return `imgs/[name]-[hash].${ext}`;
            }
            return "assets/[name]-[hash].[ext]";
          }
        }
      }
    },
    // 配置@别名
    resolve: {
      alias: {
        "@": "/src"
      }
    },
    // 配置代理
    server: {
      // host: '0.0.0.0', // 设置主机地址
      proxy: {
        "/api": {
          target: PropxUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBX3Byb2plY3RfbWVcXFxcdnVlLWFkbWluLXYxLXRlbXBsYXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxBX3Byb2plY3RfbWVcXFxcdnVlLWFkbWluLXYxLXRlbXBsYXRlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9BX3Byb2plY3RfbWUvdnVlLWFkbWluLXYxLXRlbXBsYXRlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbi8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NkEyMVx1NTc1N1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xyXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJztcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XHJcbiAgY29uc29sZS5sb2coY29tbWFuZCwgbW9kZSwgXCJjb21tYW5kLCBtb2RlXCIpO1xyXG4gIGxldCBQcm9weFVybCA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSkuVklURV9BUFBfQVBJX1VSTDtcclxuXHJcbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICBpbXBvcnRzOiBbXCJ2dWVcIiwgXCJ2dWUtcm91dGVyXCJdLFxyXG4gICAgICAgIGR0czogXCJzcmMvYXV0by1pbXBvcnRzLmQudHNcIixcclxuICAgICAgfSksXHJcbiAgICAgIHZpdGVDb21wcmVzc2lvbih7XHJcbiAgICAgICAgdGhyZXNob2xkOiAxMDI0ICogMjAsXHJcbiAgICAgICAgYWxnb3JpdGhtOiAnZ3ppcCcsXHJcbiAgICAgICAgZXh0OiAnLmd6JyxcclxuICAgICAgICBjb21wcmVzc2lvbk9wdGlvbnM6IHtcclxuICAgICAgICAgIGxldmVsOiA5LCAvLyBcdTUzOEJcdTdGMjlcdTdFQTdcdTUyMkJcdUZGMENcdTgzMDNcdTU2RjRcdTRFM0EgMS05XHVGRjBDOSBcdTRFM0FcdTY3MDBcdTlBRDhcdTUzOEJcdTdGMjlcdTczODdcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGZpbHRlcjogL1xcLihqc3xjc3N8aHRtbHxqc29uKSQvaSwgLy8gXHU0RUM1XHU1MzhCXHU3RjI5IEphdmFTY3JpcHRcdTMwMDFDU1NcdTMwMDFIVE1MIFx1NTQ4QyBKU09OIFx1NjU4N1x1NEVGNlxyXG4gICAgICB9KVxyXG4gICAgXSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIC8vIFx1NTE2NVx1NTNFM1x1NjU4N1x1NEVGNlx1OEY5M1x1NTFGQVx1NzY4NFx1NTQ3RFx1NTQwRFx1NkEyMVx1NUYwRlxyXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwianMvW25hbWVdLVtoYXNoXS5qc1wiLFxyXG4gICAgICAgICAgLy8gXHU0RUUzXHU3ODAxXHU1MjA2XHU1MjcyXHU1NDBFXHU3Njg0Y2h1bmtcdTY1ODdcdTRFRjZcdTU0N0RcdTU0MERcdTZBMjFcdTVGMEZcclxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiBcImpzL1tuYW1lXS1baGFzaF0uanNcIixcclxuICAgICAgICAgIC8vIFx1NjgzOVx1NjM2RVx1NEUwRFx1NTQwQ1x1OEQ0NFx1NkU5MFx1N0M3Qlx1NTc4Qlx1ODFFQVx1NUI5QVx1NEU0OVx1OEY5M1x1NTFGQVx1OERFRlx1NUY4NFx1NTQ4Q1x1NjU4N1x1NEVGNlx1NTQwRFxyXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXMoYXNzZXRJbmZvKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBhc3NldEluZm8ubmFtZS5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICBjb25zdCBleHQgPSBpbmZvW2luZm8ubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgICAgICBpZiAoZXh0ID09PSAnY3NzJykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBcImNzcy9bbmFtZV0tW2hhc2hdLmNzc1wiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBcdTVCOUFcdTRFNDlcdTU2RkVcdTcyNDdcdTY1ODdcdTRFRjZcdTYyNjlcdTVDNTVcdTU0MERcdTUyMTdcdTg4NjhcclxuICAgICAgICAgICAgY29uc3QgaW1nRXh0cyA9IFsncG5nJywgJ2pwZycsICdqcGVnJywgJ2dpZicsICdpY28nLCAnc3ZnJywgJ3dlYnAnXTtcclxuICAgICAgICAgICAgLy8gXHU1NkZFXHU3MjQ3XHU2NTg3XHU0RUY2XHU2NTNFXHU1MTY1aW1nc1x1NzZFRVx1NUY1NVxyXG4gICAgICAgICAgICBpZiAoaW1nRXh0cy5pbmNsdWRlcyhleHQpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGBpbWdzL1tuYW1lXS1baGFzaF0uJHtleHR9YDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gXHU1MTc2XHU0RUQ2XHU4RDQ0XHU2RTkwXHU2NTg3XHU0RUY2XHU2NTNFXHU1MTY1YXNzZXRzXHU3NkVFXHU1RjU1XHJcbiAgICAgICAgICAgIHJldHVybiBcImFzc2V0cy9bbmFtZV0tW2hhc2hdLltleHRdXCI7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gXHU5MTREXHU3RjZFQFx1NTIyQlx1NTQwRFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiBcIi9zcmNcIixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvLyBcdTkxNERcdTdGNkVcdTRFRTNcdTc0MDZcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAvLyBob3N0OiAnMC4wLjAuMCcsIC8vIFx1OEJCRVx1N0Y2RVx1NEUzQlx1NjczQVx1NTczMFx1NTc0MFxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgIFwiL2FwaVwiOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IFByb3B4VXJsLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sIFwiXCIpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVTLFNBQVMsY0FBYyxlQUFlO0FBQzdVLE9BQU8sU0FBUztBQUVoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLHFCQUFxQjtBQUU1QixJQUFPLHNCQUFRLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUNwQyxVQUFRLElBQUksU0FBUyxNQUFNLGVBQWU7QUFDMUMsTUFBSSxXQUFXLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBRTVDLFNBQU8sYUFBYTtBQUFBLElBQ2xCLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLFdBQVc7QUFBQSxRQUNULFNBQVMsQ0FBQyxPQUFPLFlBQVk7QUFBQSxRQUM3QixLQUFLO0FBQUEsTUFDUCxDQUFDO0FBQUEsTUFDRCxnQkFBZ0I7QUFBQSxRQUNkLFdBQVcsT0FBTztBQUFBLFFBQ2xCLFdBQVc7QUFBQSxRQUNYLEtBQUs7QUFBQSxRQUNMLG9CQUFvQjtBQUFBLFVBQ2xCLE9BQU87QUFBQTtBQUFBLFFBQ1Q7QUFBQTtBQUFBLE1BRUYsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQTtBQUFBLFVBRU4sZ0JBQWdCO0FBQUE7QUFBQSxVQUVoQixnQkFBZ0I7QUFBQTtBQUFBLFVBRWhCLGVBQWUsV0FBVztBQUN4QixrQkFBTSxPQUFPLFVBQVUsS0FBSyxNQUFNLEdBQUc7QUFDckMsa0JBQU0sTUFBTSxLQUFLLEtBQUssU0FBUyxDQUFDO0FBRWhDLGdCQUFJLFFBQVEsT0FBTztBQUNqQixxQkFBTztBQUFBLFlBQ1Q7QUFHQSxrQkFBTSxVQUFVLENBQUMsT0FBTyxPQUFPLFFBQVEsT0FBTyxPQUFPLE9BQU8sTUFBTTtBQUVsRSxnQkFBSSxRQUFRLFNBQVMsR0FBRyxHQUFHO0FBQ3pCLHFCQUFPLHNCQUFzQixHQUFHO0FBQUEsWUFDbEM7QUFHQSxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSztBQUFBLE1BQ1A7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQTtBQUFBLE1BRU4sT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLFFBQzlDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFtdCn0K
