/**
 * 权限按钮指令
 * 用法: v-rule="'shop:create'"
 * 权限列表应从用户状态中获取，此处提供 getPermissionList 方法供外部注入
 */

let permissionList = [];

/**
 * 设置权限列表（登录后调用）
 */
export const setPermissionList = (list) => {
  permissionList = list || [];
};

function checkPermission(el, binding) {
  if (!binding.value) {
    return;
  }
  if (!permissionList.includes(binding.value)) {
    el.parentNode?.removeChild(el);
  }
}

export const VRule = {
  mounted: checkPermission,
  updated: checkPermission,
};
