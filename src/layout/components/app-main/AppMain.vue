<template>
  <div class="app-main relative w-full overflow-hidden box-border p-5 pt-[104px] min-h-[calc(100vh-50px-43px)]">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
// 路由动态过渡：https://router.vuejs.org/zh/guide/advanced/transitions.html#基于路由的动态过渡
import {} from 'vue'
</script>

<style lang="scss" scoped>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
