import history from 'connect-history-api-fallback';
import type { PluginOption } from 'vite';
import { name } from '../package.json';
import type { MpaOptions } from './types';
import { getFirstPage, getHistoryReWriteRuleList, getMPAIO } from './utils';

export default function mpa(userOptions: Partial<MpaOptions> = {}): PluginOption {
  const options: MpaOptions = {
    defaultOpenPage: '/',
    scanDir: 'src/pages',
    scanFile: 'main.{js,ts,jsx,tsx}',
    defaultEntries: '',
    filename: 'index.html',
    rewrites: [],
    specialPageNames: '',
    ignorePageNames: '',
    ...userOptions
  };
  if (!options.scanFile?.includes('.')) {
    console.error(`[${name}]: scanFile should be something like main.ts/main.{js,ts}/index.js/index{ts,tsx}`);
    process.exit(1);
  }

  return {
    name,
    enforce: 'pre',
    config(config) {
      const openBool = typeof options.defaultOpenPage === 'boolean';

      config.build = config.build || {};
      config.build.rollupOptions = config.build.rollupOptions || {};
      config.build.rollupOptions.input = getMPAIO(config.root || process.cwd(), options);
      config.server = config.server || {};
      config.server.open = options.defaultOpenPage ? (openBool ? getFirstPage(config.build.rollupOptions.input) : options.defaultOpenPage === '/' ? '/' : '/' + options.defaultOpenPage) : false;
    },
    configureServer({ middlewares: app }) {
      app.use(
        // @ts-ignore
        history({
          verbose: Boolean(process.env.DEBUG) && process.env.DEBUG !== 'false',
          disableDotRule: undefined,
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
          rewrites: getHistoryReWriteRuleList(options)
        })
      );
    }
  };
}

export type { MpaOptions };
