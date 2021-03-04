import Vue from 'vue'
import VueRouter from 'vue-router'
import Foo from './components/Foo'
Vue.use(VueRouter)

export default () => {
    const router = new VueRouter({
        mode: 'history',
        routes: [
            {
                name: 'foo',
                path: '/',
                component: Foo
            },
            {
                path: '/bar',
                component: () => import('./components/Bar.vue')
            }
        ]
    })
    return router
}