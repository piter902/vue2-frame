// 请求头
export const CONTENT_TYPE_MAP = {
    json: 'application/json',
    form: 'application/x-www-form-urlencoded'
}
/**
 * 延迟函数
 * @param {number} time - 延迟时间 默认值1s
 * @returns
 */
export const delay = function (time = 1000) {
    return new Promise(res => {
        setTimeout(() => {
            res()
        },time)
    })
}
