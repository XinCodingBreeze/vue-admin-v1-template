import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// 自动导入模块
import AutoImport from "unplugin-auto-import/vite";
import viteCompression from 'vite-plugin-compression';
// https://vitejs.dev/config/
export default ({ command, mode }) => {
  console.log(command, mode, "command, mode");
  let PropxUrl = loadEnv(mode, process.cwd()).VITE_APP_API_URL;

  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router"],
        dts: "src/auto-imports.d.ts",
      }),
      viteCompression({
        threshold: 1024 * 20,
        algorithm: 'gzip',
        ext: '.gz',
        compressionOptions: {
          level: 9, // 压缩级别，范围为 1-9，9 为最高压缩率
        },
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
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];

            if (ext === 'css') {
              return "css/[name]-[hash].css";
            }

            // 定义图片文件扩展名列表
            const imgExts = ['png', 'jpg', 'jpeg', 'gif', 'ico', 'svg', 'webp'];
            // 图片文件放入imgs目录
            if (imgExts.includes(ext)) {
              return `imgs/[name]-[hash].${ext}`;
            }

            // 其他资源文件放入assets目录
            return "assets/[name]-[hash].[ext]";
          },
        },
      },
    },
    // 配置@别名
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    // 配置代理
    server: {
      // host: '0.0.0.0', // 设置主机地址
      proxy: {
        "/api": {
          target: PropxUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};
