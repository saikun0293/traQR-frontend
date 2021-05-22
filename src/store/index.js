import { createStore } from 'vuex'
import auth from './auth'
import courses from './courses'

const store = createStore({
  modules: {
    auth: auth,
    courses: courses
  }
})

export default store
