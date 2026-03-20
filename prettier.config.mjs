import xoSpaceConfig from 'prettier-config-xo/space';

export default {
  ...xoSpaceConfig,
  overrides: [
    {
      files: ['*.html'],
      options: {
        parser: 'html',
      },
    },
  ],
};
