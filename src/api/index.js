/**
 * API 请求层 - 统一入口
 *
 * 所有的 HTTP 请求都应该在 src/api/ 目录下定义，
 * 按业务模块拆分为独立的文件（如 user.js、order.js 等），
 * 然后在这里统一导出。
 *
 * 使用方式：
 *   import { login, getUserInfo } from '@/api'
 *
 * 好处：
 *   1. 接口集中管理，避免请求散落在各个组件中
 *   2. 方便查找和维护所有的接口调用
 *   3. 接口变更时只需要修改一处
 *   4. 便于 mock 数据和接口联调
 */

// 按模块导出
export * from "./user";
