import type { Rewrite } from 'connect-history-api-fallback';
import fg from 'fast-glob';
import path from 'path';
import yargs from 'yargs';
import type { MpaOptions } from '../';

const argv = yargs.argv;

export type PageInfo = Record<
  string,
  {
    entry: string;
    filename: string;
  }
>;

export function getFirstPage(pages: Record<string, string>): string {
  const firstPageName = Object.keys(pages)[0];
  return `/${firstPageName}/index.html`;
}

function genFileName(pageName: string, path: string): string {
  const xPath = path === '' ? '' : `${path}/`;
  return `${xPath}${pageName}.html`.replace(/^pages\//, '');
}

function parseEntryFile(file: string, filters: string[] = []) {
  const fileSplit = file.split('/');

  const pageName = fileSplit.slice(2, -1).join('/');
  const outputPath = fileSplit.slice(1, fileSplit.length - 2).join('/');
  return {
    file,
    pageName,
    outputPath,
    include: filters.includes(pageName) || filters.length === 0,
  };
}

function parseFiles(files: string[], defaultEntries: string) {
  // @ts-ignore
  const args: string =
    (argv?.entry as string) ||
    (argv?.file as string) ||
    (argv?.page as string) ||
    '';
  if (args === '') {
    defaultEntries = '';
  }

  const filters = args
    .split(',')
    .concat(defaultEntries.split(','))
    .filter(_ => _);

  const ret = files.map(file => parseEntryFile(file, filters));
  return {
    allEntries: ret,
    entries: ret.filter(e => e.include),
    args,
  };
}

function scanFile2Html(current: string, scanFile: string, filename: string) {
  const reStr = `${scanFile.split('.')[0]}[.](.*)`;
  const entryRe = new RegExp(reStr);
  return current.replace(entryRe, filename);
}

function getSpecialPageNames(specialPageNames: string) {
  let _specialPageNames;
  if (specialPageNames) {
    if (specialPageNames.includes(',')) {
      _specialPageNames = `{${specialPageNames}}`;
    } else {
      _specialPageNames = specialPageNames;
    }
  } else {
    _specialPageNames = '**';
  }
  return _specialPageNames;
}

function getIgnorePageNames(ignorePageNames: string) {
  let _ignorePageNames;
  if (ignorePageNames) {
    if (ignorePageNames.includes(',')) {
      _ignorePageNames = `{${ignorePageNames}}`;
    } else {
      _ignorePageNames = ignorePageNames;
    }
  } else {
    _ignorePageNames = '';
  }

  return _ignorePageNames;
}

function getPagesInfo({
  defaultEntries,
  scanDir,
  scanFile,
  specialPageNames,
  ignorePageNames,
}: MpaOptions): PageInfo {
  // ['src/pages/test-two/main.ts', 'src/pages/test-twos/main.ts']
  const allFiles: string[] = fg.sync(
    `${scanDir}/${getSpecialPageNames(specialPageNames)}/${scanFile}`.replace(
      '//',
      '/',
    ),
    {
      ignore: [
        `${scanDir}/${getIgnorePageNames(ignorePageNames)}/${scanFile}`.replace(
          '//',
          '/',
        ),
      ],
    },
  );

  const pages = {};
  const result = parseFiles(allFiles, defaultEntries);
  const { entries } = result;

  entries.forEach(entry => {
    const { file, pageName, outputPath } = entry;
    // @ts-ignore
    pages[pageName] = {
      entry: file,
      filename: genFileName(pageName, outputPath),
    };
  });

  return pages;
}

export function getMPAIO(root: string, options: MpaOptions) {
  const { scanFile, filename } = options;
  const pages = getPagesInfo(options);
  const input: Record<string, string> = {};

  Object.keys(pages).map(key => {
    input[key] = path.resolve(
      root,
      scanFile2Html(pages[key].entry, scanFile, filename),
    );
  });

  return input;
}

export function getHistoryReWriteRuleList(options: MpaOptions): Rewrite[] {
  const { scanDir, scanFile, filename, rewrites } = options;
  const list: Rewrite[] = rewrites;
  list.push({
    from: /^\/$/,
    to: `./${scanDir}/index/${filename}`,
  });
  const pages = getPagesInfo(options);
  Object.keys(pages).map(pageName => {
    const to = `./${scanFile2Html(pages[pageName].entry, scanFile, filename)}`;
    list.push({
      from: new RegExp(`^/${pageName}/index.html/*`),
      to,
    });
    list.push({
      from: new RegExp(`^/${pageName}/index.html$`),
      to,
    });
    list.push({
      from: new RegExp(`^\/${pageName}.html$`),
      to,
    });
    list.push({
      from: new RegExp(`^\/${pageName}$`),
      to,
    });
  });

  return list;
}
