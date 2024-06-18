/* eslint-env node */
module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  extends: ['prettier'], // 使用 Prettier 的 ESLint 配置
  plugins: ['prettier'], // 添加 Prettier 插件
  rules: {
    //ESLint关注于规范
    'vue/multi-word-component-names': 0
  }
}
