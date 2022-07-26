import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://106.52.235.252:8101',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      com: path.resolve(__dirname, 'src/components'),
    },
  },
  css: {
    //css预处理
    preprocessorOptions: {
      scss: {
        //引入varibles.scss全局预定义变量
        additionalData: `@import "./src/styles/variables.scss";`,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境去除console
        drop_console: true,
      },
    },
  },
  plugins: [
    viteCompression(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
