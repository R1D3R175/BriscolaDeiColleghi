import {defineConfig} from 'eslint/config';
import baseConfig from './base.js';

export default defineConfig(baseConfig, {
  rules: {
    'new-cap': [
      'error',
      {
        capIsNewExceptions: ['Controller', 'Get', 'Injectable', 'Module'],
      },
    ],
    'unicorn/prefer-top-level-await': 'off',
  },
});
