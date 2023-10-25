const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin');
const { getCdn } = require('./cdn')
const path = require('path')
module.exports = {
    setPlugin(env, configs) {
        const root = process.cwd()
        configs.plugin('html').tap((args) => {
            args[0].cdn = getCdn(env);
            return args;
        });
        configs.plugin('vue-auto-routing').use(
            new VueAutoRoutingPlugin({
                pages:path.join(root, 'src/views') ,
                importPrefix: '@/views/',
                outFile:path.join(root,'.route.js')
            })
        );
        if (env === 'analyzer') {
            configs.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
        }
    },
    getExternal: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        dayjs: 'dayjs',
        'element-ui': 'ELEMENT',
        '_': 'lodash'
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        proxy:{}
    }
}