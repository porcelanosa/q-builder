import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';


// Plug in logger when in development environment
const debug = import.meta.env.MODE !== 'production';
const plugins = debug ? [createLogger({})] : [];

// Plug in session storage based persistence
plugins.push(createPersistedState({ storage: window.sessionStorage }));

export default createStore({
  plugins,
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
