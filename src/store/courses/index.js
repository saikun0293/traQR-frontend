const state = {
  courses: []
}

const mutations = {
  GET_COURSES (state, payload) {
    state.courses = payload
  },
  ADD_NEW_COURSE (state, payload) {
    state.courses.push(payload)
  }
}

const actions = {
  getCourses (context, payload) {
    context.commit('GET_COURSES', payload)
  },
  insertCourse (context, payload) {
    context.commit('ADD_NEW_COURSE', payload)
  }
}

const coursesModule = {
  state,
  mutations,
  actions
}

export default coursesModule
