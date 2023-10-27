import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, loadEnv, normalizePath } from 'vite';

const globalCssPath = normalizePath(resolve('./src/assets/css/theme.scss'))

// env 配置文件目录
const envDir = resolve(__dirname, './env');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir, '')
  return {
    envDir,
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    },
    css: {
      modules: {},
      preprocessorOptions: {
        scss: {
          // 全局样式变量注入
          additionalData: `@import "${globalCssPath}";`
        }
      },
      postcss: resolve('./postcss.config.js')
    },
    base: env.VITE_BASE_URL,
    build: {
      // 初始 chunk> 800，控制台警告，需手动进行分包。
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          // 自定义分割 chunks。node_modules中的每一个模块都是一个chunk
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const reg = /node_modules\/([\w\-@]+)\//
              const chunkName = id.match(reg)?.[1]
              return chunkName
            }
          }
        }
      },
    },
    server: {
      open: false,
      port: Number(env.PORT),
      host: '0.0.0.0',
      hmr: true,
      proxy: {
        '/v1': env.VITE_FETCH_BASE_URL
      }
    },
  }
})
