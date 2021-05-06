import { createWebHistory, createRouter } from 'vue-router'
import login from '../components/LoginPage'
import home from '../views/Home'
import {
  Student,
  StudentHome,
  StudentGeneral,
  StudentQRCode,
  StudentStats,
  StudentChatRoom,
  StudentSubject
} from './student'
import {
  Faculty,
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
        component: Student,
        children: [
          {
            path: '',
            component: StudentHome
          },
          {
            path: 'stats',
            component: StudentStats
          },
          {
            path: ':id',
            component: StudentSubject,
            children: [
              {
                path: '',
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
        component: Faculty,
        children: [
          {
            path: '',
            component: FacultyHome
          },
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
            path: ':id',
            component: FacultySubject,
            children: [
              {
                path: '',
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
