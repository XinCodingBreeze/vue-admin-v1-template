/* 
* @Description: 描述
* @Author: D
* @Date: 2024-03-12 09:34
* @LastEditTime: 2024-03-26 16:10
* @LastEditors: D
* @FilePath: \admin\src\utlis\request.js
*/
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { handleDataValuesTrim } from './data';
const baseURL = import.meta.env.VITE_APP_DEV === 'dev' ? '' : (import.meta.env.VITE_APP_API_URL || '');
const service = axios.create({
  baseURL: baseURL,
  timeout: 8000 // 设置为5秒，单位是毫秒
})
service.interceptors.request.use(
  config => {
    let token = localStorage.getItem("TOKEN");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = token
      config.headers.token = token;
    }
    // 设置Accept-Language为中文
    config.headers['Accept-Language'] = 'zh-CN';

    try {
      config.data = handleDataValuesTrim(config.data ?? {})
      config.params = handleDataValuesTrim(config.params ?? {})
    } catch (error) {
      console.error(error)
    }

    return config;
  },
  error => {
    console.error(error);
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error);
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code == -401) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 2000
      })
      setTimeout(() => {
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('user');
        window.open(window.location.href, '_self')
      }, 2000);

      return
    }

    if (res.code !== 200) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 3 * 1000
      });
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  error => {
    console.error('err', error);
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
)

export default service;
