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
        '@': resolve('./src'),
        "lib": resolve('./lib')
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
    },
    base: env.VITE_BASE_URL,
    build: {
      lib: {
        entry: resolve(__dirname, 'lib/main.ts'),
        name: 'vue-tree',
        fileName: 'vue-tree',
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
          },
        },
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
