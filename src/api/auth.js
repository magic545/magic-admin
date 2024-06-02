/*
 * @Author: Magic Forge
 * @LastEditors: Magic Forge
 * @LastEditTime: 2024-06-02 15:29:21
 * @Description: 
 */
import { request } from '@/utils'

export default {
  // 登录
  login: (data) => request.post('/auth/login', data, { noNeedToken: true }),
  // 登出
  logout: () => request.post('/auth/logout'),
  // 刷新token
  refreshToken: () => request.get('/auth/refresh/token'),
  // 切换当前角色
  switchCurrentRole: (role) => request.post(`/auth/current-role/switch/${role}`),
  // 切换权限
  toggleRole: (data) => request.post('/auth/role/toggle', data),
  // 修改密码
  changePassword: (data) => request.post('/auth/password', data),
}
