/**
 * 用户相关接口
 */
import request from "@/utils/request";

/**
 * 登录
 * @param {Object} data - { username, password }
 * @returns {Promise}
 */
export const login = (data) => {
  return request({
    url: "/api/auth/login",
    method: "post",
    data,
  });
};

/**
 * 获取当前用户信息
 * @returns {Promise}
 */
export const getUserInfo = () => {
  return request({
    url: "/api/user/info",
    method: "get",
  });
};

/**
 * 退出登录
 * @returns {Promise}
 */
export const logout = () => {
  return request({
    url: "/api/auth/logout",
    method: "post",
  });
};
