//查包流程
import Vue from 'vue'

//node-modules => vue文件夹 =》 pacjkage.json => main属性中制定了加载入口，vue.common.runtime.js阉割版，导致无法正常使用
// 方式1是指定明确路径如下
// import Vue from '../node_modules/vue/dist/vue.js'
// 方式2是在webpack.config.js中使用resolve alias配置

// 1.导入login组件
import app from './App.vue'

import router from './router.js'

// npm i vue-loader vue-template-compiler -D
// 默认webpack 无法打包.vue文件，安装相关loader
let vm = new Vue({
    el: '#app',
    data: {
        msg: 'qjz'
    },
    // components: {
    //     login
    // }
    // 在webpack中如果想通过vue把一个组件放到页面中展示，vm实例中的render函数可以实现
    render: (createEl) => createEl(app),
    router

})

console.log('ok')