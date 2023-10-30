import axios from 'axios';
import { stringify } from 'qs'
import { _ } from '@piter.fe/core'
import {
    CONTENT_TYPE_MAP,
    delay
} from './utils'
const _apiList = Symbol('_apiList')
const _interceptors = Symbol('_interceptors')

class NetWork {
    [_apiList] = []; // 还在执行中的api请求容器
    responseCallBack = null;
    _headers = null;
    /**
     *
     * @param {*Object} options - 实例化参数
     * @param {*Function} [options.responseCallBack] - 响应拦截自定义处理同步函数
     * @param {*Function} [options.requestCallBack] - 请求拦截自定义处理同步函数
     * @param {*Function} [options.dataFormatCallback] - 请求结果格式化同步纯函数
     * @param {*string} [options.baseURL] - 接口全局基础domain
     * @param {*Number} [options.timeout] - 接口超时时间 默认10s
     * @param {*Object} [options.headers] - 公共请求头
     */
    constructor(options){
        const {
            responseCallBack = null,
            requestCallBack = null,
            dataFormatCallback = null,
            headers = null,
            baseURL = '',
            timeout = 10000
        } = options || {}

        this.env = process.env.NODE_ENV;
        this.timeout = timeout;
        this._headers = headers;
        this.baseURL = baseURL;
        this.verifyFn('responseCallBack', responseCallBack, () => {
            this.responseCallBack = _.debounce(responseCallBack,500)
        })

        this.verifyFn('requestCallBack', requestCallBack, () => {
            this.requestCallBack = _.debounce(requestCallBack,500)
        })

        this.verifyFn('dataFormatCallback', dataFormatCallback, () => {
            this.dataFormatCallback = dataFormatCallback
        })
    }

    /**
     * 拦截器
     * @param {*axios} instance - axios实例对象
     * @param {*Function} callback - 个性化响应拦截处理纯函数
     */
    [_interceptors](instance, callback) {
        instance.interceptors.request.use((config) => {
            if (this.requestCallBack) {
                return this.requestCallBack(config)
            }
            return config
        },(err)=>{
            return Promise.reject(err)
        })
        instance.interceptors.response.use((res) => {
            let { code, data } = res || {};
            if (data instanceof Blob) {
                return data
            }
            if(callback) {
                return callback(res)
            } else if(this.responseCallBack){
                return this.responseCallBack(res)
            }
            return res
        }, (err) => {
            return Promise.reject(err)
        })
    }

    /**
     * 函数参数校验
     * @param {*string} name 校验的参数名
     * @param {*Function} fn 校验的函数
     * @param {*Function} callback 校验通过后的自定义逻辑
     */
    verifyFn(name, fn, callback) {
        if (fn) {
            if (typeof fn !== 'function') {
                throw new Error(name+'必须是一个Function')
            }
            callback && callback()
        }
    }
    /**
     * 请求函数
     * @param {*Object} options - 请求参数对象
     * @param {*string} options.url - api接口路径
     * @param {*string} options.method - 请求方式，同axios的method
     * @param {*string} [options.baseURL] - 接口基础domain
     * @param {*Function } [options.callback]  响应拦截自定义处理同步函数,与responseCallBack函数互斥，且优先于responseCallBack
     * @param {*Function} [options.dataFormatCallback] - 请求结果格式化同步纯函数
     * @param {*boolean} [options.canRepeat] - 同接口同参数是否可以重复请求  默认值false
     * @param {*Number} [options.timeout] - 接口超时时间  默认10s
     * @param {*Object} [options.params] - 请求查询参数
     * @param {*Object} [options.data] - 请求body参数
     * @param {*Object} [options.headers] - 自定义请求头
     * @param {*Object} options.contentType  - contentType类型  json | form 默认值json
     * @returns {*Promise}
     */
    request(options){
        return new Promise(async(resolve,reject)=>{
            const {
                url,
                method = 'POST',
                params = null,
                data = null,
                headers = null,
                callback = null,
                canRepeat = false,
                contentType = 'json',
                mock = null,
                baseURL = '',
                dataFormatCallback = null,
                timeout = this.timeout
            } = options

            this.verifyFn('callback',callback)
            this.verifyFn('dataFormatCallback', dataFormatCallback)
            
            let flag = ''
            if (!canRepeat) {
                flag = method + url + (data ? stringify(data) : '') + (params ? stringify(params) : '')
                const index = this[_apiList].findIndex(ele=> ele === flag)
                if (index > -1) {
                    console.error(`请不要频繁请求${method} ${url}接口`)
                    return false
                }
                this[_apiList].push(flag)
            }
            
            this._headers['Content-Type'] = CONTENT_TYPE_MAP[contentType]
            const cloneOptions = {
                ...options,
                timeout,
                baseURL:baseURL || this.baseURL || '',
                headers:{
                    ...this._headers,
                    ...headers
                }
            }

            try {
                if ( mock && this.env === 'development' ) {
                    await delay(500)
                    return resolve(mock)
                }
                const instance = axios.create()
                this[_interceptors](instance, callback)
                const res = await instance(cloneOptions)
                const lastRes = dataFormatCallback ? dataFormatCallback(res) : (this.dataFormatCallback ? this.dataFormatCallback(res): res)
                resolve(lastRes)
            }catch(err){
                reject(err)
            } finally {
                if (flag) {
                    const index = this[_apiList].findIndex(ele => ele === flag)
                    index > -1 && this[_apiList].splice(index, 1)
                }
            }
        })
    }
    /**
     * get请求
     * @param {*Object} options - 请求参数
     * @returns Promise
     */
    get(options){
        return this.request({ ...options, method: 'GET'})
    }

    /**
     * post请求
     * @param {*Object} options - 请求参数
     * @returns Promise
     */
    post(options){
        return this.request({ ...options, method: 'POST'})
    }
}
export default NetWork;
