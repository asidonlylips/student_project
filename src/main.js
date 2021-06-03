import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueToast from 'vue-toast-notification';
import router from './router/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faSpinner,
    faTerminal,
    faSearch,
    faRobot,
    faUsers,
    faUser,
    faUniversity,
    faBook,
    faBookmark,
    faSignOutAlt,
    faTablet,
    faCheckSquare,
    faCheckCircle,
    faAlignJustify,
    faUserCog
} from '@fortawesome/free-solid-svg-icons'
import {
    faInstagram,
    faVk,
    faFacebook
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'vue-search-select/dist/VueSearchSelect.css'

library.add(
    faVk,
    faBook,
    faFacebook,
    faSpinner,
    faTerminal,
    faSearch,
    faRobot,
    faUsers,
    faUser,
    faUniversity,
    faInstagram,
    faBookmark,
    faSignOutAlt,
    faTablet,
    faCheckSquare,
    faCheckCircle,
    faAlignJustify,
    faUserCog
)

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toast-notification/dist/theme-sugar.css';
import VueCountdownTimer from 'vuejs-countdown-timer';
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueToast, {
    position: 'top-right'
})
Vue.use(VueCountdownTimer);

import urls from './urls'
Vue.use(urls);

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (localStorage.token) {
            next()
        } else {

            next({ name: 'login' })
        }
    } else {
        next() // does not require auth, make sure to always call next()!
    }
})

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')