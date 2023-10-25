"use strict";

const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const fs = require("fs");
const handlebars = require("handlebars");
const copyDir = require('copy-dir');
const path = require('path')
module.exports = class CliManager {

    constructor(options, files, name) {
        this.options = options || [];
        this.files = files;
        this.name = name;
    }

    modifyPackageContent(meta, rFileName) {
        let content = fs.readFileSync(rFileName).toString();
        const result = handlebars.compile(content)(meta);
        fs.writeFileSync(rFileName, result);
    }
    resolve(callback) {
        let files = this.files || [];
        inquirer.prompt(this.options).then((answers) => {
            const spinner = ora('项目模板开始创建...');
            spinner.start();
            try {
                copyDir.sync(path.resolve(__dirname,'./test'), process.cwd()+'/'+this.name);
                let meta = answers;
                typeof callback == 'function' && (meta = callback(answers) || answers);
                files.forEach(v => {
                    let fileName = `${meta.name}/${v}`;
                    this.modifyPackageContent(meta, fileName)
                })
                spinner.succeed();
                console.log(chalk.green('项目创建完成'))
                console.log(chalk.blue("请进入"+this.name+"目录执行"+"\n"+"npm install"+"\n"+"npm run dev"))
            }catch (err) {
                console.log(chalk.red('项目创建失败'), error)
                spinner.fail();
            }
        });
    }
}

