/*
 * @Author: XinBreeze 19931845446@163.com
 * @Date: 2025-09-28 17:44:26
 * @LastEditors: XinBreeze 19931845446@163.com
 * @LastEditTime: 2025-10-09 11:10:37
 * @FilePath: \vue-admin-v1-template\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import { configureApp } from "./config.js";
import "@/utils/auto-update.js";
import { Directive } from "@/directives/index.js";
import App from "./App.vue";
import router from "./router";
import "@/theme.css";
import useResize from "v-resize-hx";

const app = createApp(App);
configureApp(app);
Directive(app);
app.use(router);
app.use(useResize);
app.mount("#app");
