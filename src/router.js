import Vue from 'vue'

import account from './main/account.vue'
import goodslist from './main/goodslist.vue'
import login from './subcom/login.vue'
import register from './subcom/register.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
let router = new VueRouter({
    routes: [
        {
            path: '/account', component: account,
            children: [
                { path: 'login', component: login },
                { path: 'register', component: register }
            ]
        },
        {
            path: '/goodlist', component: goodslist
        }
    ]
})

export default router