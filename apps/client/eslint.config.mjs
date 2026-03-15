import {defineConfig, globalIgnores} from 'eslint/config';
import {angularAppConfig} from '@briscola-dei-colleghi/eslint';

export default defineConfig(
  globalIgnores(['**/index.html'], 'Ignore app index.html'),
  angularAppConfig,
);
