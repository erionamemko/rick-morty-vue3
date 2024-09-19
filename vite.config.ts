/// <reference types="vitest" />
/// <reference types="vite/client" />

import { fileURLToPath, URL } from 'node:url';

import nodeResolve from '@rollup/plugin-node-resolve';
import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv, UserConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [vue(), tsConfigPaths(), dynamicImport()],
    test: {
      globals: true,
      environment: 'jsdom',
      testTimeout: 6000,
      setupFiles: ['./setup.ts'],
      exclude: ['node_modules', 'dist', 'build', 'coverage'],
      css: true,
      threads: false,
      environmentOptions: {
        jsdom: {
          resources: 'usable',
        },
      },
      coverage: {
        exclude: [
          'node_modules',
          'dist',
          'build',
          'coverage',
          'src/App.vue',
          'src/main.ts',
          'src/vite-env.d.ts',
          'src/shims-vue.d.ts',
          'src/assets',
          'src/services',
          'src/composables',
          'src/@types',
          'src/layouts',
          'src/models',
          'src/pages',
          'src/router',
          'src/store',
          'src/utils',
        ],
      },
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
    server: {
      host: env.VITE_APP_HOST,
      port: Number(env.VITE_APP_PORT),
    },
    define: {
      global: {},
    },
    rollupOptions: {
      plugins: [
        nodeResolve({
          browser: true,
          preferBuiltins: false,
        }),
      ],
    },
  } as unknown as UserConfig;
});
