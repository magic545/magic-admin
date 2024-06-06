<!--------------------------------
 - @Author: Magic Forge
 - @LastEditor: Magic Forge
 - @LastEditTime: 2024-06-06 23:31:12
 - @Email: magicforge@163.com
 --------------------------------->
<template>
  <n-select v-model:value="model" :options="userList" :render-label="renderLabel" :render-tag="renderSingleSelectTag"
    :filterable="filterable" :clearable="clearable" :disabled="disabled" />
</template>

<script setup>
import { onMounted } from 'vue'
import { NAvatar, NText } from 'naive-ui'
const model = defineModel()
const props = defineProps({
  getData: {
    type: Function,
    required: true,
  },
  clearable: {
    type: Boolean,
    default: false
  },
  filterable: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const userList = ref([])
const renderLabel = (option) => {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center'
      }
    },
    [
      h(NAvatar, {
        src: option.avatar,
        round: true,
        size: 'small'
      }),
      h(
        'div',
        {
          style: {
            marginLeft: '12px',
            padding: '4px 0'
          }
        },
        [
          h('div', null, [option.label]),
          h(
            NText,
            { depth: 3, tag: 'div' },
            {
              default: () => `@${option.username}`
            }
          )
        ]
      )
    ]
  )
}
const renderSingleSelectTag = ({ option }) => {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center'
      }
    },
    [
      h(NAvatar, {
        src: option.avatar,
        round: true,
        size: 24,
        style: {
          marginRight: '12px'
        }
      }),
      option.label,
      h(
        NText,
        { depth: 3, tag: 'div' },
        {
          default: () => `@${option.username}`
        }
      )
    ]
  )
}

onMounted(() => {
  props.getData().then(({ data = {} }) => {
    const { pageData } = data
    if (pageData?.length) {
      const users = pageData.map((user) => {
        return {
          value: user.id,
          label: user.nickName,
          avatar: user.avatar,
          username: user.username
        }
      })
      userList.value = users
    }
  })
})
</script>
