/*
 * @Author: Magic Forge
 * @LastEditors: Magic Forge
 * @LastEditTime: 2024-06-02 18:02:04
 * @Description: 
 */
import { request } from '@/utils'

export default {
  // 验证菜单路径
  validateMenuPath: (path) => request.get(`/permission/menu/validate?path=${path}`),
  getAllPermissionTree: () => request.get('/permission/tree'),
  
  getMenuTree: () => request.get('/permission/menu/tree'),
  getButtons: ({ parentId }) => request.get(`/permission/button/${parentId}`),
  addPermission: (data) => request.post('/permission', data),
  savePermission: (id, data) => request.patch(`/permission/${id}`, data),
  deletePermission: (id) => request.delete(`/permission/${id}`),
}
