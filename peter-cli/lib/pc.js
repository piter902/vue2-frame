const CliManager = require('../action')
const downUrls = require('./downUrls')
module.exports = function (name) {
    const files = ["package.json"]
    const cli = new CliManager([
        {
            type: 'input',
            message: '系统名称',
            name: 'name',
            default: name
        },
        {
            type: 'input',
            message: '系统描述',
            name: 'description',
            default: name +'is pc project!'
        }
    ], files, downUrls.pcDownUrl)
    cli.resolve(res => {
        return res
    })
}