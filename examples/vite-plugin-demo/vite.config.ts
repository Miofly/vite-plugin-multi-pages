import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import mpa from '../../src';

export default defineConfig({
  plugins: [
    vue(),
    mpa({
      scanDir: 'src/pages',
      defaultOpenPage: 'test-two',
      ignorePageNames: '',
    }),
  ],
});
