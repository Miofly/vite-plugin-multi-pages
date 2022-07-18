import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import mpa from '../../src';

export default defineConfig({
  plugins: [
    vue(),
    mpa({
      defaultOpenPage: 'test-two',
      ignorePageNames: '',
    })
  ]
});
