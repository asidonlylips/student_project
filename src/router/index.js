import VueRouter from 'vue-router'

import Subjects from '../components/Subjects'
import Login from '../components/Login'
import SubjectDetail from '../components/SubjectDetail'
import Regiser from '../components/Register'
import TeacherRegister from '../components/TeacherRegister'
import Commands from '../components/Commands'


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
            path: '/commands',
            name: 'commands',
            component: Commands
        },
        {
            path: '/searchCommands',
            name: 'searchCommands',
            component: Subjects
        },
        {
            path: '/devices',
            name: 'devices',
            component: Subjects
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