const { defineConfig } = require('@vue/cli-service');
const { vueConfig } = require('@tuns/config');
const { name } = require('./package.json');
const env = process.env.NODE_ENV;
module.exports = defineConfig({
  publicPath: env === 'development' ? '/' : '/' + name,
  transpileDependencies: ['@tuns'],
  devServer: vueConfig.devServer,
  configureWebpack: (config) => {
    config.externals = vueConfig.getExternal;
  },
  chainWebpack: (configs) => {
    vueConfig.setPlugin(env, configs);
  }
});
