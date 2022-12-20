import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',  // 打包后的文件引用使用相对路径（需要时可选）
  resolve: {
    alias: { '@': pathSrc, },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],  // 自动导入Vue相关函数
      resolvers: [
        ElementPlusResolver(),  // 自动导入Element Plus相关函数
        IconsResolver({prefix: 'Icon',}),  // 自动导入图标组件
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),  // 自动导入ElementPlus组件
        IconsResolver({ enabledCollections: ['ep'], })  // 自动注册图标组件
      ],

      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),

    Icons({ autoInstall: true, }),
    Inspect(),  // 安装Inspect插件
  ],
  server: {
    port: 8080
  }
})