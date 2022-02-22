import Vue from 'vue'
import Vuex from 'vuex'
import {
  getRequest
} from '@/utils/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes: [],
    user: null,
    otherUser: null,
  },
  getters: {
    getUser: state => {
      return state.user;
    },
    getOtherUser: state => {
      return state.otherUser;
    }
  },
  mutations: {
    initRoutes(state, data) {
      state.routes = data;
    },
    setUser(state, user) {
      state.user = user
    },
    setOtherUser(state, otherUser) {
      state.otherUser = otherUser
    },

  },
  actions: {
    updateUser({ commit }) {

      return new Promise((resolve, reject) => {
        getRequest('/user/getUserInfo').then(res => {
          if (res.data) {
            commit('setUser', res.data)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })

    },
    updateOtherUser({ commit },id) {

      return new Promise((resolve, reject) => {
        getRequest('/user/findById',{id:id}).then(res => {
          if (res.data) {
            commit('setOtherUser', res.data)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })

    },

  },
  modules: {}
})