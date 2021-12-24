import { createStore } from 'vuex';

export default createStore({
  state: {
    userUid: null,
    userEmail: null
  },
  getters: {
    GET_USER_UID (state) : String | null { return state.userUid; },
    GET_USER_EMAIL (state) { return state.userEmail; }
  },
  actions: {
    SET_USER_UID_ACTION ({ commit }, user) {
      commit('SET_USER_UID', user);
    },
    SET_USER_EMAIL_ACTION ({ commit }, user) {
      commit('SET_USER_EMAIL', user);
    }
  },
  mutations: {
    SET_USER_UID (state, user) {
      state.userUid = user.userUid;
    },
    SET_USER_EMAIL (state, user) {
      state.userEmail = user.userEmail;
    }
  }
});
