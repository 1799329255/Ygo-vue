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
  fomatTime
} from '@/utils/time'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.filter('fomatTime', fomatTime)

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
          store.commit('setUser', user)

          // 有user信息的情况，直接跳转
          next()
        }
      })
    }
    // 有user信息的情况，直接跳转
    next()
  } else
    //未登录情况，这些地址放行 
    if (to.path == '/' || to.path == '/main' || to.path == '/login' || to.path == '/register' ||
      to.path == '/search' || to.path == '/cardSearch' || to.path == '/card' || to.path == '/cards' || to.path.match('/user/*') || to.path.match('/article*')) {
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