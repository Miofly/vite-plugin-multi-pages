import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import mpa from '../../src';

export default defineConfig({
  plugins: [
    vue(),
    mpa({
      defaultOpenPage: 'test-two',
      ignorePageNames: ''
    })
  ]
});
