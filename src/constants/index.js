/**
 * 全局常量配置
 *
 * 集中管理项目中的常量值，避免硬编码（魔法字符串/魔法数字）散落在代码各处。
 *
 * 使用方式：
 *   import { STORAGE_KEYS, HTTP_STATUS } from '@/constants'
 */

// 按模块导出
export * from "./storage";
export * from "./http";
