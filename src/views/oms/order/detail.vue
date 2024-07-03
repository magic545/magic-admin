<!--------------------------------
 - @Author: Magic Forge
 - @LastEditor: Magic Forge
 - @LastEditTime: 2024-06-09 11:56:59
 - @Email: magicforge@163.com
 --------------------------------->
<template>
  <CommonPage>
    <n-card title="订单进度">
      <n-steps :current="currentStep" :status="currentStatus">
        <n-step :title="step.label" v-for="step in stepOptions" :key="step.value"></n-step>
      </n-steps>
    </n-card>
    <n-card class="mt-20">
      <n-tabs placement="left" type="card" :default-value="currentStep">
        <n-tab-pane :name="step.value" :tab="step.label" v-for="step in stepOptions" :key="step.value">
          {{ step.label }}
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </CommonPage>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { OrderApi } from '@/api'

const route = useRoute()

const currentStatus = ref('process')
const currentStep = ref(Number(route.query.step))
const stepOptions = [
  { label: '评估中', value: 1 },
  { label: '首付款', value: 2 },
  { label: '开发中', value: 3 },
  { label: '验收中', value: 4 },
  { label: '尾付款', value: 5 },
  { label: '交付中', value: 6 },
  { label: '维护中', value: 7 },
  { label: '已完成', value: 8 },
]

onBeforeMount(() => {
  OrderApi.getOrder(route.params.orderNumber).then(({ data }) => {
    const { step, state } = data || {}
    if (state === 0) {
      currentStep.value = stepOptions.length
    } else if (state === 1) {
      currentStatus.value = 'error'
    } else {
      currentStep.value = step
    }
  })
})

</script>
