# vite-plugin-multi-pages

**中文** | [English](./README.md)

> 支持 vite 的多页应用程序-支持 vue2/3、react 等

## 如何使用

### 安装

```sh
yarn add vite-plugin-multi-pages
# or
pnpm add vite-plugin-multi-pages
```

### 配置

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
   * 默认打开页面
   * @default true
   * @example / (root path) | true (first page) | test-two
   */
  defaultOpenPage: '/' | boolean | string;
  /**
   * 多页面目录
   * @default src/views
   */
  scanDir: string;
  /**
   * 文件入口
   * @default 'main.{js,ts,jsx,tsx}'
   */
  scanFile: string;
  /**
   * html 文件名
   * @default 'index.html'
   */
  filename: string;
  /**
   * 路由匹配规则
   * @default ''
   */
  rewrites: Rewrite[];
  /**
   * 打包或启动特定的页面
   * @default ''
   * @example test-one,test-twos
   */
  specialPageNames: string;
  /**
   * 忽略打包或启动特定的页面
   * @default ''
   * @example test-twos
   */
  ignorePageNames: string;
}
```

## 使用示例

- [src/examples](https://github.com/Miofly/vite-plugin-multi-pages/tree/master/examples/vite-plugin-demo)

## 更多

- 配合 `vite-plugin-html-template-mpa` 自动生成 `index.html`
  模板插件使用: [https://github.com/Miofly/vite-plugin-html-template-mpa](https://github.com/Miofly/vite-plugin-html-template-mpa)
- 配合 `vite-plugin-vconsole-mpa`
  自动配置 `vconsole`: [https://github.com/Miofly/vite-plugin-vconsole-mpa](https://github.com/Miofly/vite-plugin-vconsole-mpa)
