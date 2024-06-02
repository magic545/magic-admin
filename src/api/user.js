/*
 * @Author: Magic Forge
 * @LastEditors: Magic Forge
 * @LastEditTime: 2024-06-02 17:49:46
 * @Description: 
 */
import { request } from '@/utils'

export default {
  // 获取用户信息
  getUser: () => request.get('/user/detail'),
  // 获取所有用户
  getAllUsers: (params = {}) => request.get('/user', { params }),

  // 修改用户信息
  updateProfile: (data) => request.patch(`/user/profile/${data.id}`, data),
  // 重置用户密码
  resetPwd: (id, data) => request.patch(`/user/password/reset/${id}`, data),

  // 用户增删改查
  create: (data) => request.post('/user', data),
  read: (params = {}) => request.get('/user', { params }),
  update: (data) => request.patch(`/user/${data.id}`, data),
  delete: (id) => request.delete(`/user/${id}`),
}
