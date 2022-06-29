import type { Rewrite } from 'connect-history-api-fallback';

export interface MpaOptions {
  defaultOpenPage: string;
  scanDir: string;
  scanFile: string;
  filename: string;
  defaultEntries: string;
  rewrites: Rewrite[]
  specialPageNames: string;
  ignorePageNames: string;
  buildPrefixName: string;
  htmlNoDirectory: boolean
}

export type UserOptions = Partial<MpaOptions>;
