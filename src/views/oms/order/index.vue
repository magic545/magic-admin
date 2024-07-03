<!--------------------------------
 - @Author: Magic Forge
 - @LastEditor: Magic Forge
 - @LastEditTime: 2024-06-07 23:07:23
 - @Email: magicforge@163.com
 --------------------------------->
<template>
  <CommonPage>
    <template #action>
      <n-button type="primary" @click="handleAdd()">
        <i class="i-material-symbols:add mr-4 text-18" />
        新增订单
      </n-button>
    </template>

    <MeCrud ref="$table" v-model:query-items="queryItems" :scroll-x="1100" :columns="columns" :get-data="OrderApi.read">
      <MeQueryItem label="编号" :label-width="50">
        <n-input v-model:value="queryItems.number" placeholder="请输入订单编号" clearable />
      </MeQueryItem>
      <MeQueryItem label="关联用户" :label-width="80">
        <UserSelect v-model:value="queryItems.userId" :get-data="UserApi.read" clearable />
      </MeQueryItem>
      <MeQueryItem label="进度" :label-width="50">
        <n-select v-model:value="queryItems.step" :options="stepOptions" clearable filterable />
      </MeQueryItem>
      <MeQueryItem label="状态" :label-width="50">
        <n-select v-model:value="queryItems.state" :options="[
          { label: '已完成', value: 0 },
          { label: '已取消', value: 1 },
        ]" clearable filterable />
      </MeQueryItem>
    </MeCrud>
    <MeModal ref="modalRef" width="520px">
      <n-form ref="modalFormRef" label-placement="left" label-align="left" :label-width="80" :model="modalForm">
        <n-form-item label="订单名称" path="name" :rule="{
          required: true,
          message: '请输入订单名称',
          trigger: ['input', 'blur'],
        }">
          <n-input v-model:value="modalForm.name" />
        </n-form-item>
        <n-form-item label="订单描述" path="description" :rule="{
          required: true,
          message: '请输入订单描述',
          trigger: ['input', 'blur'],
        }">
          <n-input v-model:value="modalForm.description" type="textarea" />
        </n-form-item>
        <n-form-item v-if="!['edit'].includes(modalAction)" label="关联用户" path="userId">
          <UserSelect v-model:value="modalForm.userId" :get-data="UserApi.read" />
        </n-form-item>
      </n-form>
    </MeModal>
  </CommonPage>
</template>

<script setup>
import { NButton, NAvatar, NTag, NText } from 'naive-ui'
import { MeCrud, MeQueryItem, MeModal, UserSelect } from '@/components'
import { useCrud } from '@/composables'
import { OrderApi, UserApi } from '@/api'
import { formatDateTime } from '@/utils'

defineOptions({ name: 'OrderMgt' })

const router = useRouter()

const $table = ref(null)
/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})

const stepOptions = [
  { label: '评估中', value: 1 },
  { label: '首付款', value: 2 },
  { label: '开发中', value: 3 },
  { label: '验收中', value: 4 },
  { label: '尾付款', value: 5 },
  { label: '交付中', value: 6 },
  { label: '维护中', value: 7 },
]

const columns = [
  { title: '编号', key: 'number', width: 200, align: 'center' },
  { title: '名称', key: 'name', width: 200, align: 'center', ellipsis: { tooltip: true } },
  {
    title: '状态',
    key: 'state',
    width: 100,
    align: 'center',
    render: (row) => {
      if (row.state !== null) {
        return h(
          NTag,
          { type: row.state === 0 ? 'success' : 'error' },
          { default: () => row.state === 0 ? '已完成' : '已取消' }
        )
      }
      const option = stepOptions.find(item => item.value == row.step) || {}
      return h(
        NTag,
        { type: 'info' },
        { default: () => option.label || row.step }
      )
    },
  },
  { title: '价格', width: 100, align: 'center', key: 'price' },
  { title: '关联用户', align: 'center', key: 'nickName' },
  {
    title: '创建时间',
    align: 'center',
    render(row) {
      return h('span', formatDateTime(row['createTime']))
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 220,
    align: 'center',
    fixed: 'right',
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            disabled: row.code === 'SUPER_ADMIN',
            onClick: () => router.push({ path: `/order/detail/${row.number}`, query: { step: row.step } }),
          },
          {
            default: () => '查看详情',
            icon: () => h('i', { class: 'i-fe:book-open text-14' }),
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: 'margin-left: 12px;',
            disabled: row.code === 'SUPER_ADMIN',
            onClick: () => handleDelete(row.number),
          },
          {
            default: () => '删除',
            icon: () => h('i', { class: 'i-material-symbols:delete-outline text-14' }),
          }
        ),
      ]
    },
  },
]

const { modalRef, modalFormRef, modalAction, modalForm, handleAdd, handleDelete, handleEdit } =
  useCrud({
    name: '订单',
    doCreate: OrderApi.create,
    doDelete: OrderApi.delete,
    doUpdate: OrderApi.update,
    initForm: { enable: true },
    refresh: () => $table.value?.handleSearch(),
  })
</script>
