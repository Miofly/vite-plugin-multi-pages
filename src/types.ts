/**
 * MPA Plugin options.
 */

import type { Rewrite } from 'connect-history-api-fallback';

export interface MpaOptions {
  /**
   * defaultOpenPage
   * @default true
   * @example / (root path) | true (first page) | test-two
   */
  defaultOpenPage: '/' | boolean | string;
  /**
   * scanning dir
   * @default src/pages
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
   * default included entry
   * @default ''
   */
  defaultEntries: string;
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
