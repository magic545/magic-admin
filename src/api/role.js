/*
 * @Author: Magic Forge
 * @LastEditors: Magic Forge
 * @LastEditTime: 2024-06-02 17:17:43
 * @Description: 
 */
import { request } from '@/utils'

export default {
  // 获取角色权限
  getRolePermissions: () => request.get('/role/permissions/tree'),
  getAllRoles: () => request.get('/role?enable=1'),

  // 权限增删改查
  create: (data) => request.post('/role', data),
  read: (params = {}) => request.get('/role/page', { params }),
  update: (data) => request.patch(`/role/${data.id}`, data),
  delete: (id) => request.delete(`/role/${id}`),

  // 设置用户权限
  addRoleUsers: (roleId, data) => request.patch(`/role/users/add/${roleId}`, data),
  removeRoleUsers: (roleId, data) => request.patch(`/role/users/remove/${roleId}`, data),
}
