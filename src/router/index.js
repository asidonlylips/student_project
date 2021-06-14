import VueRouter from 'vue-router'

import Subjects from '../components/Subjects'
import Login from '../components/Login'
import SubjectDetail from '../components/SubjectDetail'
import Regiser from '../components/Register'
import TeacherRegister from '../components/TeacherRegister'
import Commands from '../components/Commands'
import Devices from '../components/Devices'
import Tests from '../components/Tests'
import TestDetail from '../components/TestDetail'
import TestResult from '../components/TestResult'
import TestResultDetail from '../components/TestResultDetail'
import Reports from '../components/Reports'
const RedirectAdmin = () => import("../components/RedirectAdmin.vue");


export default new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'index',
            component: Subjects,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/subjects',
            name: 'subjects',
            component: Subjects,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/subjecs/:id',
            name: 'subjectDetail',
            props: true,
            component: SubjectDetail,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Regiser
        },
        {
            path: '/teacher-register',
            name: 'teacher-register',
            component: TeacherRegister,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/tests',
            name: 'tests',
            component: Tests,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/tests/:id',
            name: 'testDetail',
            component: TestDetail,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/commands',
            name: 'commands',
            component: Commands,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/devices',
            name: 'devices',
            component: Devices,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/groups',
            name: 'groups',
            component: Subjects,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Subjects,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/tests-results',
            name: 'tests-results',
            component: TestResult,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/tests-results/:id',
            name: 'tests-results-detail',
            component: TestResultDetail,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/reports',
            name: 'reports',
            component: Reports,
            meta: {
                requiresAuth: true
            }
        },
        { 
            path: '/admin', 
            name: 'admin',
            components: { default: RedirectAdmin },
            meta: {
                requiresAuth: true
            }
        },
    ]
})