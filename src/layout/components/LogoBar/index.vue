<template>
    <div class="logo">
      <img src="@/assets/logo.png" alt="">
      <h2 v-show="!collapsed" class="title">vue3-admin-template</h2>
    </div>
</template>

<script setup lang="ts">
defineProps({
  collapsed:{
    type:Boolean
  }
})
</script>

<style lang="scss" scoped>
.logo{
  display: flex;
  align-items: center;
  padding-left: 14px;
  height: 64px;
  overflow: hidden;
  white-space: nowrap; // 防止字体换行
  img{
    height: 32px;
    margin-right: 8px;
  }

  .title{
    font-size: 13px;
    color: white;
    margin-bottom: 0;
  }
}
</style>