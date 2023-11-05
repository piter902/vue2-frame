# @peter.fe/network 网络库介绍

```js
import Network from "@peter.fe/network";
const http = new Network({
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
});

//GET请求
http.get({url: '/test',...})

//POST请求
http.post({url: '/test',...})

//通用请求
http.request({method: 'PUT', url:'/test',...})
```

## 构造参数说明

| 参数               | 说明                       | 类型     | 可选值 | 默认值 | 是否必传 |
| ------------------ | -------------------------- | -------- | ------ | ------ | -------- |
| responseCallBack   | 响应拦截自定义处理同步函数 | Function | -      | -      | false    |
| requestCallBack    | 请求拦截自定义处理同步函数 | Function | -      | -      | false    |
| dataFormatCallback | 响应结果数据结构处理函数   | Function | -      | -      | false    |
| headers            | 公共请求头                 | Object   | -      | -      | false    |
| baseURL            | 接口全局基础 domain        | String   | -      | -      | false    |
| successCode        | 接口成功响应状态码         | Number   | -      | 200    | false    |
| successCode        | 接口成功响应状态码         | Array    | -      | -      | false    |
| timeout            | 接口超时时间               | Number   | -      | 10000  | false    |

## 实例函数介绍

| 函数名  | 说明          | 类型     | 示例                                        |
| ------- | ------------- | -------- | ------------------------------------------- |
| request | 请求函数      | Function | http.request({url: '/test', method: 'PUT'}) |
| get     | GET 请求函数  | Function | http.get({url: '/test'})                    |
| post    | POST 请求函数 | Function | http.post({url: '/test'})                   |

## 请求函数参数说明

| 参数               | 说明                                                               | 类型     | 可选值 | 默认值 | 是否必传 |
| ------------------ | ------------------------------------------------------------------ | -------- | ------ | ------ | -------- |
| url                | api path                                                           | String   | -      | -      | true     |
| method             | 请求方式                                                           | String   | -      | POST   | true     |
| callback           | 接口自定义响应拦截处理函数，优先级高于全局的 responseCallBack      | Function | -      | -      | false    |
| canRepeat          | 同接口同参数是否允许重复请求                                       | Boolean  | -      | false  | false    |
| timeout            | 接口超时时间                                                       | Number   | -      | 10000  | false    |
| headers            | 自定义请求头                                                       | Object   | -      | -      | -        |
| dataFormatCallback | 响应结果数据结构处理函数，优先级高于全局的 dataFormatCallback 函数 | Function | -      | -      | false    |
| mock               | mock 数据，只在开发环境时生效                                      | Object   | -      | -      | false    |
| 其他               | axios 相关参数                                                     | Object   | -      | -      | false    |
