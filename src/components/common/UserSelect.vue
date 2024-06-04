<!--------------------------------
 - @Author: Magic Forge
 - @LastEditor: Magic Forge
 - @LastEditTime: 2024-06-04 22:43:14
 - @Email: magicforge@163.com
 --------------------------------->
<template>
  <n-select v-model:value="userId" :options="userList" :render-label="renderLabel" :render-tag="renderSingleSelectTag"
    :on-update:value="selectChange" filterable clearable />
</template>

<script setup>
import { onMounted } from 'vue'
import { NAvatar, NText } from 'naive-ui'
const emit = defineEmits(['update:userId',])
const props = defineProps({
  userId: {
    type: Number,
  },
  getData: {
    type: Function,
    required: true,
  },
})

const userId = ref(props.userId)
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

const selectChange = (value) => {
  emit('update:userId', value)
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
