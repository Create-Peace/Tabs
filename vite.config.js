import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
 
import { createVuePlugin } from 'vite-plugin-vue2';
import { injectHtml, minifyHtml } from 'vite-plugin-html';
import { cjs2esmVitePlugin } from 'cjs2esmodule'
import dotenv from 'dotenv'
// const config = require('./config')
 
try {
  // 根据环境变量加载环境变量文件
  const file = dotenv.parse(fs.readFileSync(`./config/.env.${process.env.NODE_ENV}`), {
    debug: true
  })
  console.log(file)
  // 根据获取的 key 给对应的环境变量赋值
  for (const key in file) {
    process.env[key] = file[key]
  }
} catch (e) {
  console.error(e)
}
const API_LOCATION = process.env.API_LOCATION || '/api'
 
function resolve(dir) {
  return path.join(__dirname, './', dir)
}
export default defineConfig({
  root: './', // 项目根目录（index.html 文件所在的位置）可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
  publicDir: 'public', // 作为静态资源服务的文件夹.该值可以是文件系统的绝对路径，也可以是相对于项目的根目录的相对路径。
  base: './', // 公共基础路径。改值可以是绝对路径或空字符串
  mode: 'development',
  optimizeDeps: { // 要预构建的第三方依赖
    include: []
  },
  build: {
    lib: {
        entry: './src/main.js'
      }
  },
  resolve: {
    alias: {
      // 'vue': 'vue/dist/vue.esm.js', // 如果是模板解析的 - 使用这个 vue：内部为正则表达式  vue 结尾的
      'vendor': resolve('src/vendor'),
      '@': resolve('src'),
      '~@': resolve('src'),
      '~component': resolve('src/components'),
      '~config': resolve('config'),
    }
  },
  plugins: [
    cjs2esmVitePlugin(), // 将 commonjs 转化为 es module： 有报错
    createVuePlugin({
      jsx: true,
      jsxOptions: {
        injectH: false,
      },
    }),
    minifyHtml(), // 压缩 HTML
    injectHtml({ // 入口文件 index.html 的模板注入
      injectData: { // 模板注入的数据
        htmlWebpackPlugin: {
          options: {
            isVite: true,
            shotcut: '/static/img/favicon.png',
          }
        },
        title: 'HMO 运营后台',
      },
    }),
  ],
  define: {
    'process.env': process.env
  },
  server: {
    // host: 'liang.myweb.com',
    open: true, // 是否自动打开浏览器
    port: process.env.PORT || 9000,
    proxy: {
      [API_LOCATION]: {
        target: 'http://127.0.0.1:8001',
        rewrite: (path) => path.replace(API_LOCATION, '')
      }
      
    }
  },
});
