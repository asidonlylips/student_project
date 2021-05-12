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


export default new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'index',
            component: Subjects
        },
        {
            path: '/subjects',
            name: 'subjects',
            component: Subjects
        },
        {
            path: '/subjecs/:id',
            name: 'subjectDetail',
            props: true,
            component: SubjectDetail
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
            component: TeacherRegister
        },
        {
            path: '/tests',
            name: 'tests',
            component: Tests
        },
        {
            path: '/tests/:id',
            name: 'testDetail',
            component: TestDetail
        },
        {
            path: '/commands',
            name: 'commands',
            component: Commands
        },
        {
            path: '/devices',
            name: 'devices',
            component: Devices
        },
        {
            path: '/groups',
            name: 'groups',
            component: Subjects
        },
        {
            path: '/profile',
            name: 'profile',
            component: Subjects
        },
    ]
})