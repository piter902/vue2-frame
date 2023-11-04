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
