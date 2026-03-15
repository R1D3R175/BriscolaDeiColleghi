import {defineConfig, globalIgnores} from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import angularBaseConfig from './angular.js';

export const withoutStorybookConfig = defineConfig(angularBaseConfig, {
  rules: {
    '@angular-eslint/directive-selector': [
      'error',
      {
        type: 'attribute',
        prefix: 'lib',
        style: 'camelCase',
      },
    ],
    '@angular-eslint/component-selector': [
      'error',
      {
        type: 'element',
        prefix: 'lib',
        style: 'kebab-case',
      },
    ],
  },
});

export const withStorybookConfig = defineConfig(
  withoutStorybookConfig,
  globalIgnores(['!.storybook'], 'Include Storybook Directory'),
  {
    files: ['**/*.stories.ts', '.storybook/**/*.ts'],
    extends: [storybook.configs['flat/recommended']],
  },
);
