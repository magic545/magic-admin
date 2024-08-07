/**********************************
 * @Author: Magic Forge
 * @LastEditor: Magic Forge
 * @LastEditTime: 2024-06-07 22:42:24
 * @Email: magicforge@163.com
 ***********************************/
import { request } from '@/utils'

export default {
  // 订单增删改查
  create: (data) => request.post('/order', data),
  read: (params = {}) => request.get('/order', { params }),
  update: (data) => request.patch(`/order/${data.number}`, data),
  delete: (id) => request.delete(`/order/${id}`),

  // 通过订单号获取订单信息
  getOrder: (number) => request.get(`/order/${number}`),
}
