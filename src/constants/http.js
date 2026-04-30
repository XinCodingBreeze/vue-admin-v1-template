/**
 * HTTP 相关常量
 */

// 业务状态码
export const HTTP_STATUS = {
  SUCCESS: 200, // 请求成功
  UNAUTHORIZED: -401, // 未授权/Token 过期
};

// 请求超时时间（毫秒）
export const REQUEST_TIMEOUT = 8000;

// 文件上传地址
export const FILE_UPLOAD_URL = "/file/uploadFile";
