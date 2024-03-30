import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vuePlugin()
    ],
    resolve: {
        alias: {
          '@': '/src',
          // ...其他别名配置
        },
    },
})