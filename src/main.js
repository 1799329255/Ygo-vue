import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/utils/api'
import {
  getCookie
} from './utils/cookie'
import {
  initMenu
} from '@/utils/menu'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

Vue.config.productionTip = false

/**
 * 路由守卫
 * 每次跳转时检测是否有token，如果有token，则加载用户对应的路由列表，存入vuex。
 * 如果本地没有user信息，则请求后台，获取用户信息，用于右上角展示。
 */
router.beforeEach((to, from, next) => {

  // 用户已经登录的情况
  if (getCookie('tokenStr') || window.sessionStorage.getItem('tokenStr')) {

    // 没有user信息，先获取user信息，再跳转
    if (!store.state.user) {
      return getRequest('/user/getUserInfo').then(res => {
        if (res) {
          // 获取用户信息，保存到vuex
          let user = res.data
          store.commit('setUser', res.data)

          // 有user信息的情况，直接跳转
          next()
        }
      })
    }
    // 有user信息的情况，直接跳转
    next()
  } else
    //未登录情况，这些地址放行 
    if (to.path.matchAll('/','/main','/login','/register','/article*')) {
      next()
    } else {
      // 其他未登录情况，跳往主页
      next({
        path: '/main',
        replace: true
      })
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')