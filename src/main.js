import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
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
    faSignOutAlt
)

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import urls from './urls'
Vue.use(urls);


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')