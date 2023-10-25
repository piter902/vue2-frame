const defaultCdn = {
    js: [
        'https://cdn.bootcdn.net/ajax/libs/vue/2.7.14/vue.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.6.5/vue-router.js',
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.14/index.js',
        'https://cdn.bootcdn.net/ajax/libs/axios/1.5.0/axios.js',
        'https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.9/dayjs.min.js',
        'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.min.js'
    ],
    css: [
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.14/theme-chalk/index.min.css'
    ]
}
/**
 * 
 * @param {string} env 环境变量：production|pre|sit|development
 * @returns {object}
 */
exports.getCdn = (env) => {
    const cdnConfig = {
        'production': {
            js: [
                'https://cdn.bootcdn.net/ajax/libs/vue/2.7.14/vue.min.js',
                'https://cdn.bootcdn.net/ajax/libs/vue-router/3.6.5/vue-router.min.js',
                'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.14/index.min.js',
                'https://cdn.bootcdn.net/ajax/libs/axios/1.5.0/axios.min.js',
                'https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.9/dayjs.min.js',
                'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.min.js'
            ],
            css: [
                'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.14/theme-chalk/index.min.css'
            ]
        }
    }
    return cdnConfig[env] || defaultCdn
}