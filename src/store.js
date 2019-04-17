import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const state = {
  token: "",
  auth: ""
};

const getters = {
  getToken(state) {
    return state.token;
  }
};

const mutations = {
  isToken(state, token) {
    state.token = token;
  },
  isAuth(state, auth) {
    state.auth = auth;
  }
};

const actions = {};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          // 只储存state中的assessmentData
          token: val.token,
          auth: val.auth
        };
      }
    })
  ]
});
