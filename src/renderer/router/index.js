import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'home-page',
        component: require('@/components/HomePage').default
    },
    {
        path: '/webphone',
        name: 'webphone-page',
        beforeEnter: (to, from, next) => {
            if (store.state.Agent.agentConnected != null) {
                next();
            } else {
                next('/');
            }
        },
        component: require('@/components/WebPhonePage').default
    },
    {
        path: '*',
        redirect: '/'
    }
  ]
})
