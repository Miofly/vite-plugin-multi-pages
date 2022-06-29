# vite-plugin-multi-pages-entry

> 对 `Vite` 的多页应用程序支持- 支持 `Vue2/3`、`React` 等

## Usage

```sh
yarn add vite-plugin-multi-pages-entry
# or
pnpm add vite-plugin-multi-pages-entry
```

```ts
// vite.config.ts
import mpa from 'vite-plugin-multi-pages-entry'

// @see https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // ...other plugins
    mpa(/* options */),
  ],
})
```

## Options

```typescript
export interface MpaOptions {
  /**
   * viteDevServer的打开路径
   * 此插件将尝试为您打开第一页，但您仍然可以自定义, e.g. /index#/about
   * @default 第一页路径
   */
  defaultOpenPage: string;
  /**
   * 扫描位置
   * @default 'src/pages'
   */
  scanDir: string;
  /**
   * 扫描文件
   * @default 'main.{js,ts,jsx,tsx}'
   */
  scanFile: string;
  /**
   * html 文件名
   * @default 'index.html'
   */
  filename: string;
  /**
   * default included entry
   * @default ''
   */
  defaultEntries: string;
  /**
   * rewrite rule list
   * @default []
   */
  rewrites: Rewrite[]
  /**
   * 开启或打包 scanDir 下特定的页面
   * @default 空 | app-four,app-nine
   */
  specialPageNames: string;
  /**
   * 忽略开启或打包 scanDir 下特定的页面
   * @default 空 | app-four,app-nine
   */
  ignorePageNames: string;
  /**
   * 打包文件目录是否加入前缀
   * @default 空 | string
   */
  buildPrefixName: string;
  /**
   * 打包后是否不需要主目录
   * @default false
   * 配置为 true，会将 index.html 的父级目录删除，同时 index.html 名称会更改为 父目录名称.html
   */
  htmlNoDirectory: boolean
}
```

## Examples

- `see` [src/examples](https://github.com/Miofly/vite-plugin-multi-pages-entry/tree/master/example/vite-plugin-demo)
