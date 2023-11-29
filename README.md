# vite-plugin-multi-pages

**English** | [中文](./README.zh_CN.md)

> Multi page applications supporting vite - vue2、3, react, etc

## How To Use

### Install

```sh
yarn add vite-plugin-multi-pages
# or
pnpm add vite-plugin-multi-pages
```

### ToConfigure

**vite.config.ts**

```typescript
import mpa from 'vite-plugin-multi-pages';

export default defineConfig({
  plugins: [mpa(/* options */)],
});
```

## Options

```typescript
export interface MpaOptions {
  /**
   * defaultOpenPage
   * @default true
   * @example / (root path) | true (first page) | test-two
   */
  defaultOpenPage: '/' | boolean | string;
  /**
   * scanning dir
   * @default src/views
   */
  scanDir: string;
  /**
   * scanFile
   * @default 'main.{js,ts,jsx,tsx}'
   */
  scanFile: string;
  /**
   * html fileName
   * @default 'index.html'
   */
  filename: string;
  /**
   * rewrite rule list
   * @default []
   */
  rewrites: Rewrite[];
  /**
   * open or build a specific page under scanDir
   * @default ''
   * @example test-one,test-twos
   */
  specialPageNames: string;
  /**
   * ignore open or build a specific page under scanDir
   * @default ''
   * @example test-twos
   */
  ignorePageNames: string;
}
```

## examples

- [src/examples](https://github.com/Miofly/vite-plugin-multi-pages/tree/master/examples/vite-plugin-demo)

## More

- Cooperate `vite-plugin-html-template-mpa`
  plugin : [https://github.com/Miofly/vite-plugin-html-template-mpa](https://github.com/Miofly/vite-plugin-html-template-mpa)
- Cooperate `vite-plugin-vconsole-mpa` plugin config
  vconsole : [https://github.com/Miofly/vite-plugin-vconsole-mpa](https://github.com/Miofly/vite-plugin-vconsole-mpa)
