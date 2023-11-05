# @peter.fe/core 核心包介绍

## 阐述

### 导出了常用的开源库和创建了 Vue 的实例

- [x] vue
- [x] vue-router
- [x] axios
- [x] dayjs
- [x] element-ui
- [x] lodash
- [x] install

```js
import Vue, {
  VueRouter,
  axios,
  dayjs,
  ElementUI,
  _ as lodash,
  install,
} from "@peter.fe/core";
```

### install 使用说明

```js
import Vue, { install } from "@peter.fe/core";
Vue.use(install, {
  netWork: {
    responseCallBack: (res) => {
      console.log(res);
    },
    requestCallBack: (config) => {
      return config;
    },
    dataFormatCallback: (res) => {
      return res.data;
    },
    headers: { "content-type": "json" },
    baseURL: "https://wwww.baidu.com",
    successCode: 200,
    timeout: 5000,
  },
  Router: {
    routes: [],
    mode: "hash",
    beforeEach: (to, from, next, http) => {
      console.log(to, from, http);
      next();
    },
    beforeResolve: (to, from, next, http) => {
      console.log(to, from, http);
      next();
    },
  },
});
```

### install options 参数说明

| 参数     | 说明                                                                                                                   | 类型   | 可选值 | 默认值 | 是否必传 |
| -------- | ---------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------ | -------- |
| osPlugin | 自定义插件                                                                                                             | Object | -      | -      | false    |
| Router   | 路由相关参数，见下表                                                                                                   | Object | -      | -      | false    |
| netWork  | [见@peter.fe/network 包说明文档的构造参数](https://github.com/piter902/vue2-frame/blob/master/peter-network/README.md) | Object | -      | -      | false    |

### Router 参数说明

| 参数          | 说明             | 类型     | 可选值 | 默认值 | 是否必传 |
| ------------- | ---------------- | -------- | ------ | ------ | -------- |
| routes        | 路由表           | Array    | -      | []     | true     |
| beforeEach    | 路由前置拦截函数 | Function | -      | -      | false    |
| beforeResolve | 路由全局解析守卫 | Function | -      | -      | false    |
