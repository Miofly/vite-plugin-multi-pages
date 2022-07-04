# vite-plugin-multi-pages

> Multi page application support for 'vite' - support for 'vue2/3', 'react', etc

## Usage

```sh
yarn add vite-plugin-multi-pages
# or
pnpm add vite-plugin-multi-pages
```

```ts
// vite.config.ts
import mpa from 'vite-plugin-multi-pages'

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
   * open path of vite dev server
   * This plug-in will try to open the first page for you, but you can still customize it, e.g. /index#/about
   * @default firstPagePath
   */
  defaultOpenPage: string;
  /**
   * scanning position
   * @default 'src/pages'
   */
  scanDir: string;
  /**
   * Scan file
   * @default 'main.{js,ts,jsx,tsx}'
   */
  scanFile: string;
  /**
   * html fileName
   * @default 'index.html'
   */
  filename: string;
  /**
   * default included entry
   * @default ''
   */
  defaultEntries: string;
  /**
   * rewrite page jump rules
   * @default []
   */
  rewrites: Rewrite[]
  /**
   * Open or package a specific page under scandir
   * @default empty | app-four,app-nine
   */
  specialPageNames: string;
  /**
   * Ignore opening or packaging specific pages under scandir
   * @default empty | app-four,app-nine
   */
  ignorePageNames: string;
  /**
   * whether the package file directory is prefixed
   * @default empty | string
   */
  buildPrefixName: string;
  /**
   * Whether the home directory is not required after packaging
   * @default false
   * configured as true，Index The parent directory of HTML is deleted, and index The HTML name will be changed to the parent directory name html
   */
  htmlNoDirectory: boolean
}
```

## Examples

- `see` [src/examples](https://github.com/Miofly/vite-plugin-multi-pages/tree/master/example/vite-plugin-demo)
