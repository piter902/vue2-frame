import { ElementUI, VueRouter } from "./index";
import NetWork from "@piter.fe/network";
import App from "./components/entry.vue";
import { generateApis } from "./generate";

/**
 *
 * @param {Vue} Vue
 * @param {*Object} [options]
 * @param {*Object} [options.osPlugin] - 自定义Vue插件
 * @param {*Object} [options.Router] - 路由相关参数
 * @param {*Array} [options.Router.routes] - 路由表
 * @param {*Array} [options.Router.mode] - 路由模式，默认hash
 * @param {*Function} [options.Router.beforeEach] - 路由前置守卫
 * @param {*Function} [options.Router.beforeResolve] - 路由全局解析守卫
 * @param {*Object} [options.netWork] - 网络库请求构造参数
 * @param {*Function} [options.netWork.responseCallBack] - 响应拦截自定义处理同步函数
 * @param {*Function} [options.netWork.requestCallBack] - 请求拦截自定义处理同步函数
 * @param {*Function} [options.netWork.dataFormatCallback] - 请求结果格式化同步纯函数
 * @param {*string} [options.netWork.baseURL] - 接口全局domain
 * @param {*Number} [options.netWork.timeout] - 接口超时时间 默认10s
 * @param {*Object} [options.netWork.headers] - 公共请求头
 */
export const install = (Vue, options) => {
  Vue.config.productionTip = false;
  const {
    osPlugin = {},
    Router: {
      mode = 'hash',
      routes = [],
      beforeEach = null,
      beforeResolve = null
    } = {},
    netWork = {},
  } = options || {};

  Vue.use(ElementUI);
  Vue.use(VueRouter);
  
  // 网络库创建
  const http = new NetWork(netWork);
  Vue.prototype.$http = http;
  
  // api函数注册
  const apis = generateApis(http);
  Object.keys(apis).forEach((api) => {
    Vue.prototype[api] = apis[api];
  });
  
  // 路由注册
  const router = new VueRouter({
    mode,
    routes,
  });
  
  if (beforeEach) {
    router.beforeEach((...rest) => {
      beforeEach(...rest, http);
    });
  }
  if (beforeResolve) {
    router.beforeResolve((...rest) => {
      beforeResolve(...rest, http);
    });
  }
  // Vue注册
  new Vue({
    router,
    ...osPlugin,
    render: (h) => h(App),
  }).$mount('#app');
};
