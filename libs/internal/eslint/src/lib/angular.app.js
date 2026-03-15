import {defineConfig, globalIgnores} from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import angularBaseConfig from './angular.js';

export default defineConfig(
  angularBaseConfig,
  {
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  globalIgnores(['!.storybook'], 'Include Storybook Directory'),
  {
    files: ['**/*.stories.ts', '.storybook/**/*.ts'],
    extends: [storybook.configs['flat/recommended']],
  },
);
