import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import MyHeader from '../components/MyHeader.vue'
import MyMain from '../components/MyMain.vue'
import MyFooter from '../components/MyFooter.vue'
import Wrapper from '../components/Wrapper.vue'
import userOverView from '../components/user/userOverView.vue'
import userArticle from '../components/user/userArticle.vue'
import userComment from '../components/user/userComment.vue'
import userFollow from '../components/user/userFollow.vue'
import userFan from '../components/user/userFan.vue'
import userSetting from '../components/user/userSetting.vue'
import Article from '../components/Article.vue'
import Write from '../components/Write.vue'
import User from '../components/User.vue'
import Search from '../components/Search.vue'
import CardSearch from '../components/CardSearch.vue'
import Cards from '../components/Cards.vue'
import Card from '../components/Card.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'/main', // 设置默认打开的页面
    children: [
      {
        path: '/main',
        name: 'Main',
        component: MyMain
      },
      {
        path: '/user',
        name: 'User',
        component: User,
        redirect:'/user/overView', // 设置默认打开的页面
        children:[
          {
            path: '/user/overView',
            name: 'userOverView',
            component: userOverView
          },
          {
            path: '/user/article',
            name: 'userArticle',
            component: userArticle
          },
          {
            path: '/user/comment',
            name: 'userComment',
            component: userComment
          },
          {
            path: '/user/follow',
            name: 'userFollow',
            component: userFollow
          },
          {
            path: '/user/fan',
            name: 'userFan',
            component: userFan
          },
          {
            path: '/user/setting',
            name: 'userSetting',
            component: userSetting
          },
        ]
      },
      {
        path: '/article',
        name: 'Article',
        component: Article
      },
      {
        path: '/write',
        name: 'Write',
        component: Write
      },
      {
        path: '/search',
        name: 'Search',
        component: Search
      },
      {
        path: '/cardSearch',
        name: 'CardSearch',
        component: CardSearch
      },
      {
        path: '/cards',
        name: 'Cards',
        component: Cards
      },
      {
        path: '/card',
        name: 'Card',
        component: Card
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
