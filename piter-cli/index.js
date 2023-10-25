#! /usr/bin/env node
"use strict";
const program = require('commander');
const inquirer = require('inquirer');
const projectType = require('./projectType')
/**
 * piter -v | piter --version
 * 获取cli版本号
*/
const { version } = require('./package.json');
program
    .version(version, "-v, --version");


/**
 * piter create <project name>
 * 创建项目
 */
program
    .command('create <name>')
    .description('创建项目')
    .action((name) => {
        inquirer.prompt([projectType]).then((res) => {
            require('./lib/'+ res.type)(name)
        })
    })

program.parse(process.argv);