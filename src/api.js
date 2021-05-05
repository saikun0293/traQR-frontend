import axios from 'axios'

const api = axios.create({
  baseURL: 'https://traqr-pro.herokuapp.com/'
})

export default api
