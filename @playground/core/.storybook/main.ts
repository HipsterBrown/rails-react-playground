import type { StorybookViteConfig } from '@storybook/builder-vite'

const config: StorybookViteConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  typescript: {
    check: true,
  },
  features: {
    storyStoreV7: true,
  },
  core: {
    builder: "@storybook/builder-vite"
  },
  framework: "@storybook/react",
  async viteFinal(config, _options) {
    return config;
  }
}
export default config;
