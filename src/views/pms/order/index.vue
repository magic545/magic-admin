<!--------------------------------
 - @Author: Magic Forge
 - @LastEditor: Magic Forge
 - @LastEditTime: 2024-06-03 23:28:29
 --------------------------------->
<template>
  <CommonPage>
    <template #action>
      <n-button type="primary" @click="handleAdd()">
        <i class="i-material-symbols:add mr-4 text-18" />
        新增订单
      </n-button>
    </template>

    <MeCrud ref="$table" v-model:query-items="queryItems" :scroll-x="1200" :columns="columns" :get-data="RoleApi.read">
      <MeQueryItem label="编号" :label-width="50">
        <n-input v-model:value="queryItems.name" type="text" placeholder="请输入订单编号" clearable />
      </MeQueryItem>
      <MeQueryItem label="关联用户" :label-width="80">
        <n-input v-model:value="queryItems.username" type="text" placeholder="请输入用户名" clearable />
      </MeQueryItem>
      <MeQueryItem label="状态" :label-width="50">
        <n-select v-model:value="queryItems.status" clearable :options="[
          { label: '已完结', value: 0 },
          { label: '评估中', value: 1 },
          { label: '首付款', value: 2 },
          { label: '开发中', value: 3 },
          { label: '交付中', value: 4 },
          { label: '交付中', value: 5 },
          { label: '维护中', value: 6 },
        ]" />
      </MeQueryItem>
    </MeCrud>
    <MeModal ref="modalRef" width="520px">
      <n-form ref="modalFormRef" label-placement="left" label-align="left" :label-width="80" :model="modalForm">
        <n-form-item label="角色名" path="name" :rule="{
          required: true,
          message: '请输入角色名',
          trigger: ['input', 'blur'],
        }">
          <n-input v-model:value="modalForm.name" />
        </n-form-item>
        <n-form-item label="角色编码" path="code" :rule="{
          required: true,
          message: '请输入角色编码',
          trigger: ['input', 'blur'],
        }">
          <n-input v-model:value="modalForm.code" :disabled="modalAction !== 'add'" />
        </n-form-item>
        <n-form-item label="权限" path="permissionIds">
          <n-tree key-field="id" label-field="name" :selectable="false" :data="permissionTree"
            :checked-keys="modalForm.permissionIds" :on-update:checked-keys="(keys) => (modalForm.permissionIds = keys)"
            default-expand-all checkable check-on-click class="cus-scroll max-h-200 w-full" />
        </n-form-item>
        <n-form-item label="状态" path="enable">
          <n-switch v-model:value="modalForm.enable">
            <template #checked>启用</template>
            <template #unchecked>停用</template>
          </n-switch>
        </n-form-item>
      </n-form>
    </MeModal>
  </CommonPage>
</template>

<script setup>
import { NButton, NSwitch, NTag } from 'naive-ui'
import { MeCrud, MeQueryItem, MeModal } from '@/components'
import { useCrud } from '@/composables'
import { RoleApi, PermissionApi } from '@/api'

defineOptions({ name: 'RoleMgt' })

const router = useRouter()

const $table = ref(null)
/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})

const columns = [
  { title: '序号', key: 'id' },
  { title: '名称', key: 'name' },
  {
    title: '状态',
    key: 'status',
    ellipsis: { tooltip: true },
    render: (row) => {
      return h(
        NTag,
        { type: 'success' },
        { default: () => row.name }
      )
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 320,
    align: 'right',
    fixed: 'right',
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 12px;',
            disabled: row.code === 'SUPER_ADMIN',
            onClick: () => handleEdit(row),
          },
          {
            default: () => '编辑',
            icon: () => h('i', { class: 'i-material-symbols:edit-outline text-14' }),
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: 'margin-left: 12px;',
            disabled: row.code === 'SUPER_ADMIN',
            onClick: () => handleDelete(row.id),
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
    doCreate: RoleApi.create,
    doDelete: RoleApi.delete,
    doUpdate: RoleApi.update,
    initForm: { enable: true },
    refresh: () => $table.value?.handleSearch(),
  })

const permissionTree = ref([])
PermissionApi.getAllPermissionTree().then(({ data = [] }) => (permissionTree.value = data))
</script>
