import nx from '@nx/eslint-plugin';
import angular from 'angular-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import baseConfig from '../../eslint.config.mjs';
import storybook from "eslint-plugin-storybook";

const angularConfig = {
  files: ['**/*.ts'],
  extends: [
    angular.configs.tsRecommended,
  ],
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
};

const angularTemplateConfig = {
  files: ['**/*.html'],
  extends: [
    angular.configs.templateRecommended,
    angular.configs.templateAccessibility,
  ],
};

const storybookConfig = {
  files: [
    '**/*.stories.ts',
    '.storybook/**/*.ts',
  ],
  ...storybook.configs['flat/recommended'],
  rules: {
    'storybook/default-exports': 'error',
    'storybook/story-exports': 'error',
    'storybook/no-stories-of': 'error',
    'storybook/no-title-property-in-meta': 'error',
    'storybook/await-interactions': 'error',
    'storybook/context-in-play-function': 'error',
    'storybook/use-storybook-expect': 'error',
    'storybook/use-storybook-testing-library': 'error',
  },
};

export default defineConfig(
  globalIgnores(['!.storybook'], 'Include Storybook Directory'),
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  angularConfig,
  angularTemplateConfig,
  storybookConfig,
);
