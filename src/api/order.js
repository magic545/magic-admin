/**********************************
 * @Author: Magic Forge
 * @LastEditor: Magic Forge
 * @LastEditTime: 2024-06-03 23:29:15
 * @Email: magicforge@163.com
 ***********************************/
import { request } from '@/utils'

export default {
  // 订单增删改查
  create: (data) => request.post('/user', data),
  read: (params = {}) => request.get('/user', { params }),
  update: (data) => request.patch(`/user/${data.id}`, data),
  delete: (id) => request.delete(`/user/${id}`),
}
