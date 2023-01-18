// 关于项目的配置信息

import { defineStore } from 'pinia'

const useSettingStore = defineStore('setting', () => {
    // 侧边栏是否打开
    const sidebarOpened = ref(true) // 侧边栏伸缩

    // 侧边栏伸缩
    function triggerSidebarOpened() {
        sidebarOpened.value = !sidebarOpened.value
    }

    return { sidebarOpened, triggerSidebarOpened }
})

export default useSettingStore