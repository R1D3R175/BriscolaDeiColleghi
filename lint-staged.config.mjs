const lintedFiles = '*.{js,cjs,mjs,ts,cts,mts,json}';
const nxLint = files =>
  `pnpx nx affected --target=lint --fix --files=${files.join(',')}`;

export default {
  lintedFiles: nxLint,
  ['{apps,libs}/**/' + lintedFiles]: nxLint,
};
