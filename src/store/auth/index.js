const state = {
  user: {},
  constraints: {},
  isLoggedIn: false,
};

const mutations = {
  AUTHENTICATE_USER(state, payload) {
    state.user = payload;
    state.isLoggedIn = true;
  },
  SET_CONSTRAINTS(state, payload) {
    state.constraints = payload;
  },
  SIGN_OUT_USER(state) {
    state.user = {};
    state.constraints = {};
  },
};

const actions = {
  authenticateUser(context, payload) {
    context.commit("AUTHENTICATE_USER", payload);
  },
  setConstraints(context, payload) {
    context.commit("SET_CONSTRAINTS", payload);
  },
  signOutUser(context) {
    context.commit("SIGN_OUT_USER");
  },
};

const authModule = {
  state,
  mutations,
  actions,
};

export default authModule;
