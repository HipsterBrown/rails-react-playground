module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  typescript: {
    check: true,
  },
  features: {
    storyStoreV7: true,
    babelModeV7: true,
    breakingChangesV7: true
  },
  framework: "@storybook/react-webpack5"
};
