import { createApp } from 'vue'
import App from './views/App.vue'
import router from './router'
import store from './store'
import JsonCSV from 'vue-json-csv'

import firebase from 'firebase/app'
import './assets/tailwind.css'

const firebaseConfig = {
  apiKey: 'AIzaSyCeD65g4jFroZny15evWZkd5NbhAkKEoPw',
  authDomain: 'traqr-api-oauth.firebaseapp.com',
  projectId: 'traqr-api-oauth',
  storageBucket: 'traqr-api-oauth.appspot.com',
  messagingSenderId: '550517854500',
  appId: '1:550517854500:web:fe77bab4603a372860e3b1',
  measurementId: 'G-JFET279QS3'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

createApp(App)
  .use(router)
  .use(store)
  .component('downloadCsv', JsonCSV)
  .mount('#app')
