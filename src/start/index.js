import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

function start() {
  console.log("[自动获取全部可显示页面]");

  const viewsDir = path.resolve(__dirname, "../views");
  let files = getAllVueFiles(viewsDir);

  files = files.map((item) => {
    return item.replace(/\\/g, "/");
  });

  let str = "";
  files.forEach((item) => {
    let n = item.replace(/.*src\//, "@/");
    str += `"${n}":()=>import("${n}"),\r\n`;
  });

  const routerFilePath = path.resolve(__dirname, "../router/all.router.js");
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
