const spacing = [1, 2, 3, 8, 10, 12, 14, 15, 16, 18, 20, 24, 32, 40, 56, 64, 96, 128, 240, 480]
const fontSize = [12, 13, 14, 16, 18, 20, 24, 28, 26]
const lineHeight = [1, 1.3, 1.5, 1.7, 2]
const borderRadius = [3,4,6,8]
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.{js,jsx,vue}'
  ],
  darkMode: false,
  theme: {
    extend: {
      spacing: {
        ...spacing.reduce((pre, cur) => { pre[cur+'px'] = cur + 'px'; return pre }, {})
      },
      backgroundColor: {
        primary: '#409EFF',
        success: '#67C23A',
        warning: '#E6A23C',
        danger: '#F56C6C',
        info: '#909399'
      },
      borderColor: {
        level1: '#DCDFE6',
        level2: '#E4E7ED',
        level3: '#EBEEF5',
        level4: '#F2F6FC'
      },
      fontSize: {
        ...fontSize.reduce((pre, cur) => { pre[cur+'px'] = cur + 'px'; return pre }, {})
      },
      lineHeight: {
        ...lineHeight.reduce((pre, cur) => { pre[cur] = cur ; return pre }, {})
      },
      borderRadius: {
        ...borderRadius.reduce((pre, cur) => { pre[cur+'px'] = cur + 'px'; return pre }, {})
      },
      textColor: {
        primary: '#303133',
        normal: '#606266',
        minor: '#909399',
        placeholder: '#C0C4CC'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/line-clamp')]
};