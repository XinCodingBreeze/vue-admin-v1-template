import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 递归收集指定目录下的全部 .vue 文件路径
function getAllVueFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllVueFiles(filePath, filesList);
    } else if (file.endsWith(".vue")) {
      filesList.push(filePath);
    }
  });

  return filesList;
}

// 执行入口：生成全部页面的路由懒加载映射并写入 all.router.js
function start() {
  console.log("[自动获取全部可显示页面]");

  const viewsDir = path.resolve(__dirname, "../views");
  let files = getAllVueFiles(viewsDir);

  // 统一路径分隔符，兼容 Windows 反斜杠
  files = files.map((item) => item.replace(/\\/g, "/"));

  let str = "";
  // 构造 import 映射："@/views/xxx.vue": ()=>import("@/views/xxx.vue")
  files.forEach((item) => {
    let n = item.replace(/.*src\//, "@/"); 
    str += `"${n}":()=>import("${n}"),\r\n`;
  });

  const routerFilePath = path.resolve(__dirname, "../router/all.router.js");
  // 将映射写入路由聚合文件，供路由动态引用
  fs.writeFileSync(
    routerFilePath,
    `
    export const ROUTERSDATA = {
    ${str}
    }`,
  );
  console.log("[./src/router/all.router.js 写入]");
}

start();
