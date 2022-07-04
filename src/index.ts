import type { PluginOption, UserConfig } from 'vite';
import type { UserOptions } from './lib/options';
import history from 'connect-history-api-fallback';
import path from 'path';
import shell from 'shelljs';
import { getMPAIO, getHistoryReWriteRuleList, getFirstPage } from './lib/utils';
import { name } from '../package.json';

export default function mpa(userOptions: UserOptions = {}): PluginOption {
  const options = {
    defaultOpenPage: '',
    scanDir: 'src/pages',
    scanFile: 'main.{js,ts,jsx,tsx}',
    defaultEntries: '',
    filename: 'index.html',
    rewrites: [],
    specialPageNames: '',
    ignorePageNames: '',
    buildPrefixName: '',
    htmlNoDirectory: false,
    ...userOptions
  };
  if (!options.scanFile?.includes('.')) {
    console.error(`[${name}]: scanFile should be something like main.ts/main.{js,ts}/index.js/index{ts,tsx}`);
    process.exit(1);
  }
  let resolvedConfig: UserConfig;
  return {
    name,
    enforce: 'pre',
    config(config) {
      resolvedConfig = config;
      config.build = config.build || {};
      config.build.rollupOptions = config.build.rollupOptions || {};
      config.build.rollupOptions.input = getMPAIO(config.root || process.cwd(), options);
      config.server = config.server || {};
      config.server.open = config.server.open ?
        options.defaultOpenPage === '' ? getFirstPage(config.build.rollupOptions.input) :
        options.defaultOpenPage === '/' ? '/' : '/' + options.defaultOpenPage : config.server.open;
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
    },
    closeBundle() {
      const root = resolvedConfig.root || process.cwd();
      const dest = (resolvedConfig.build && resolvedConfig.build.outDir) || 'dist';
      const resolve = (p: string) => path.resolve(root, p);

      if (options.filename !== 'index.html') {
        shell.ls(resolve(`${dest}/${options.scanDir}/**/*.html`)).forEach((html) => {
          shell.mv(html, html.replace(options.filename, 'index.html'));
        });
      }
  
      if (options.htmlNoDirectory) {
        shell.ls(resolve(`${dest}/${options.scanDir}/**/*.html`)).forEach((html) => {
          const _fileName = html.split('/')[html.split('/').length - 2];
          shell.mv(html, html.replace(options.filename, `${options.buildPrefixName}${_fileName}.html`));
        });
      }
      
      if (options.buildPrefixName) {
        shell.ls('-d', resolve(`${dest}/${options.scanDir}/*`)).forEach((name) => {
          const _fileName = name.split('/')[name.split('/').length - 1];
          shell.mv(name, name.replace(_fileName, `${options.buildPrefixName}${_fileName}`));
        });
      }
      
      shell.rm('-rf', resolve(`${dest}/*.html`));
      if (!options.htmlNoDirectory) {
        shell.mv(resolve(`${dest}/${options.scanDir}/*`), resolve(dest));
      } else {
        shell.mv(resolve(`${dest}/${options.scanDir}/**/*.html`), resolve(dest));
      }
      shell.rm('-rf', resolve(`${dest}/src`));
    }
  };
}

export type { UserOptions as MpaOptions };
