import { createWebHistory, createRouter } from 'vue-router'
import login from '../components/LoginPage'
import home from '../views/Home'
import {
  StudentHome,
  StudentGeneral,
  StudentQRCode,
  StudentStats,
  StudentChatRoom,
  StudentSubject
} from './student'
import {
  FacultyChatRoom,
  FacultyDoubts,
  FacultyGeneral,
  FacultyHome,
  FacultyNewClass,
  FacultyQRCode,
  FacultyStats,
  FacultySubject
} from './faculty'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'home',
    component: home,
    children: [
      {
        path: 'student',
        component: StudentHome,
        children: [
          {
            path: 'stats',
            component: StudentStats
          },
          {
            path: 'subject',
            component: StudentSubject,
            children: [
              {
                path: 'general',
                component: StudentGeneral
              },
              {
                path: 'qrcode',
                component: StudentQRCode
              },
              {
                path: 'chatroom',
                component: StudentChatRoom
              }
            ]
          }
        ]
      },
      {
        path: 'faculty',
        component: FacultyHome,
        children: [
          {
            path: 'stats',
            component: FacultyStats
          },
          {
            path: 'doubts',
            component: FacultyDoubts
          },
          {
            path: 'newclass',
            component: FacultyNewClass
          },
          {
            path: 'subject',
            component: FacultySubject,
            children: [
              {
                path: 'general',
                component: FacultyGeneral
              },
              {
                path: 'qrcode',
                component: FacultyQRCode
              },
              {
                path: 'chatroom',
                component: FacultyChatRoom
              }
            ]
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
