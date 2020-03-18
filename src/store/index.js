import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locale: process.env.VUE_APP_I18N_LOCALE || 'en',
    base: '',
    path: ''
  },
  getters: {
    locale(state) {
      return state.locale
    },
    base(state) {
      return state.base
    }
  },
  mutations: {
    setLocale(state, payload) {
      state.locale = payload.locale
      state.base = payload.base
    }
  },
  actions: {
    setLocale({ commit }, payload) {
      commit('setLocale', payload)
    }
  },
  modules: {
  }
})
