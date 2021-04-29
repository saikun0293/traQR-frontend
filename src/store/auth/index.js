const state = {
  user: {},
  token: "",
  isStudent: false,
};

const mutations = {
  AUTHENTICATE_USER(state, payload) {
    state.user = payload.user;
  },
  SET_CONSTRAINTS(state, payload) {
    state.token = payload.idToken;
    state.isStudent = payload.isStudent;
  },
  SIGN_OUT_USER(state) {
    state.user = {};
    state.token = "";
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
