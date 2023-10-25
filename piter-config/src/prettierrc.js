module.exports = {
    // tab缩进大小,默认为2
    tabWidth: 2,
    // 超过最大值换行 默认80(项目实践出结果)
    printWidth: 120,
    // 使用tab缩进，默认false
    useTabs: false,
    // 句尾添加分号
    semi: true,
    // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)(项目实践出结果)
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
    proseWrap: 'preserve',
    // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 always 总是有括号
    arrowParens: 'always',
    // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    bracketSpacing: true,
    // 结尾是 \n \r \n\r auto
    endOfLine: 'lf',
    htmlWhitespaceSensitivity: 'ignore',
    // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
    ignorePath: '.prettierignore',
    // Require a "prettierconfig" to format prettier
    requireConfig: false,
    // 行尾逗号,默认none,可选 none|es5|all {name: 'audaque'}
    // es5 包括es5中的数组、对象
    // all 包括函数对象等所有可选
    trailingComma: 'none'
}
  