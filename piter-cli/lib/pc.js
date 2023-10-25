const CliManager = require('../action')
const downUrls = require('./downUrls')
module.exports = function (name) {
    const files = ["package.json"]
    const cli = new CliManager([
        {
            type: 'input',
            message: '系统名称，对应子应用的publicPath',
            name: 'name',
            default: name
        },
        {
            type: 'input',
            message: '系统描述',
            name: 'description',
            default: 'this is piter pc project!'
        }
    ], files, downUrls.pcDownUrl)
    cli.resolve(res => {
        return res
    })
}