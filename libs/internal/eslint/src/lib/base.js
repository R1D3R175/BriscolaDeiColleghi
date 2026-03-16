import eslint from '@eslint/js';
import nx from '@nx/eslint-plugin';
import {defineConfig} from 'eslint/config';
import xoTypescriptSpaceConfig from 'eslint-config-xo-typescript/space';
import {importX} from 'eslint-plugin-import-x';
import prettierRecommendedConfig from 'eslint-plugin-prettier/recommended';
import unicorn from 'eslint-plugin-unicorn';
import * as jsoncParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';
import {removePluginDefinitions} from './utilities.js';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  nx.configs['flat/base'],
  nx.configs['flat/javascript'],
  nx.configs['flat/typescript'],
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  unicorn.configs.all,
  prettierRecommendedConfig,
  {
    files: ['**/*.{js,cjs,mjs,ts,cts,mts}'],
    extends: [
      removePluginDefinitions(xoTypescriptSpaceConfig, ['@typescript-eslint']),
    ],
    rules: {
      '@stylistic/curly-newline': 'off',
      '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
    },
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ['**/*.{ts,cts,mts}'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    rules: {
      'no-unused-vars': [
        'error',
        {
          args: 'none',
        },
      ],
      'no-void': 'off',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          depConstraints: [
            {
              sourceTag: 'scope:internal',
              onlyDependOnLibsWithTags: ['scope:internal'],
            },
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:internal'],
            },
            {
              sourceTag: 'scope:api',
              onlyDependOnLibsWithTags: [
                'scope:api',
                'scope:shared',
                'scope:internal',
              ],
            },
            {
              sourceTag: 'scope:client',
              onlyDependOnLibsWithTags: [
                'scope:client',
                'scope:shared',
                'scope:internal',
              ],
            },
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:data-access',
                'type:ui',
                'type:utility',
              ],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:data-access',
                'type:ui',
                'type:utility',
              ],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:ui', 'type:utility'],
            },
            {
              sourceTag: 'type:utility',
              onlyDependOnLibsWithTags: ['type:utility'],
            },
          ],
        },
      ],
      'import-x/no-cycle': 'error',
      'import-x/first': 'error',
      'import-x/exports-last': 'error',
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          alphabetize: {order: 'asc'},
        },
      ],
      'unicorn/prevent-abbreviations': [
        'error',
        {
          ignore: [String.raw`tsconfig\.lib(\.prod)?$`],
        },
      ],
    },
  },
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.mjs'],
        },
      ],
    },
    languageOptions: {
      parser: jsoncParser,
    },
  },
);
