<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">
      刷新
    </li>
    <li @click="onCloseRightClick">
      关闭右侧所有标签
    </li>
    <li @click="onCloseOtherClick">
      关闭其他所有标签
    </li>
  </ul>
</template>

<script setup>
// 右键项
import { defineProps } from 'vue'
import useSystemStore from '@/store/system'
import { useRouter } from 'vue-router';

const router = useRouter()
const systemStore = useSystemStore()
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const onRefreshClick = () => {
  router.go(0)
}

const onCloseRightClick = () => {
  systemStore.removeTagsView({ type: 'right', index: props.index })
}

const onCloseOtherClick = () => {
  systemStore.removeTagsView({ type: 'other', index: props.index })
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
