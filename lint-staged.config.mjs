const eslintLintedFiles = '*.{js,cjs,mjs,ts,cts,mts,json}';
const stylelintLintedFiles = '*.{css,scss}';
const nxLint = files =>
  `pnpx nx affected --target=lint --fix --files=${files.join(',')}`;
const nxStylelint = files =>
  `pnpx nx affected --target=stylelint --fix --files=${files.join(',')}`;

export default {
  [eslintLintedFiles]: nxLint,
  ['{apps,libs}/**/' + eslintLintedFiles]: nxLint,
  ['{apps,libs}/**/' + stylelintLintedFiles]: nxStylelint,
};
