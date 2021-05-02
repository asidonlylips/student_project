import VueRouter from 'vue-router'

import Second from '../components/Second'
import First from '../components/First'
import Subjects from '../components/Subjects'
import Login from '../components/Login'
import SubjectDetail from '../components/SubjectDetail'


export default new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',

            name: 'index',
            component: Second
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
            component: Login
        },
        {
            path: '/commands',
            name: 'commands',
            component: First
        },
        {
            path: '/searchCommands',
            name: 'searchCommands',
            component: First
        },
        {
            path: '/devices',
            name: 'devices',
            component: First
        },
        {
            path: '/groups',
            name: 'groups',
            component: First
        },
        {
            path: '/profile',
            name: 'profile',
            component: First
        },
    ]
})