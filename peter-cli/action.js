"use strict";

const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const fs = require("fs");
const handlebars = require("handlebars");
const downloadUrl = require("download");
module.exports = class CliManager {

    constructor(options, files, downUrl) {
        this.options = options || [];
        this.files = files;
        this.downUrl = downUrl
    }
    download(url, name, success, fail) {    // 下载文件
        downloadUrl(url, name, {
            extract: true,
            strip: 1,
            mode: "666",
            headers: {
                accept: "application/zip"
            },
        }).then(data => {
            success && success(data);
        }).catch(err => {
            fail && fail(err);
        });
    }

    modifyPackageContent(meta, rFileName) {
        let content = fs.readFileSync(rFileName).toString();
        const result = handlebars.compile(content)(meta);
        fs.writeFileSync(rFileName, result);
    }
    resolve() {
        let files = this.files || [];
        inquirer.prompt(this.options).then((answers) => {
            const spinner = ora('项目模板开始创建...');
            spinner.start();
            try {
                let meta = answers;
                this.download(this.downUrl, answers.name, res => {
                    files.forEach(v => {
                        let fileName = `${meta.name}/${v}`;
                        this.modifyPackageContent(meta, fileName)
                    })
                    spinner.succeed();
                    console.log(chalk.green('项目创建完成'))
                    console.log(chalk.blue("请进入"+answers.name+"目录执行"+"\n"+"npm install"+"\n"+"npm run dev"))
                })
                
            }catch (err) {
                console.log(chalk.red('项目创建失败'), err)
                spinner.fail();
            }
        });
    }
}

