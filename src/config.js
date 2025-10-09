/*
 * @Author: XinBreeze 19931845446@163.com
 * @Date: 2025-09-28 17:44:26
 * @LastEditors: XinBreeze 19931845446@163.com
 * @LastEditTime: 2025-10-09 13:58:15
 * @FilePath: \vue-admin-v1-template\src\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 引入一些配置 然后再引入到main.js中
 */
import "element-plus/dist/index.css";
import "@/assets/styles/reset.css";
import "@/assets/styles/common.scss";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import pinia from "@/store";

export function configureApp(app) {
  app.use(ElementPlus);
  app.use(pinia);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}
