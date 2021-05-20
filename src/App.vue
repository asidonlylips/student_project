<template>
 <div id="app">
    <div id="nav">
      <custom-router-link class="left hide" :icon="['fas', 'university']" :label="'БРУ'" route_name="index" :size="'3x'" />
      <custom-router-link class="hide" v-if="role | is_superuser" :icon="['fas', 'book']" :label="'Предметы'" route_name="subjects" :style="{'padding-left': '100px'}" />
      <custom-router-link class="hide" v-if="role | is_superuser" :icon="['fas', 'terminal']" :label="'Команды'" route_name="commands" withLine/>
      <custom-router-link class="hide" v-if="role | is_superuser" :icon="['fas', 'check-square']" :label="'Тесты'" route_name="tests" withLine/>
      <custom-router-link class="hide" v-if="role | is_superuser" :icon="['fas', 'bookmark']" :label="'Результы'" route_name="tests-results" withLine/>
      <custom-router-link class="hide" v-if="role | is_superuser" :icon="['fas', 'robot']" :label="'Устройства'" route_name="devices" withLine/>
      <custom-router-link class="hide" v-if="role == '2' | is_superuser" :icon="['fas', 'users']" :label="'Группы'" route_name="groups" withLine/>
      <custom-router-link class="hide" v-if="role | is_superuser" :icon="['fas', 'robot']" :label="'Отчеты'" route_name="reports" withLine/>
      <custom-router-link class="hide" v-if="is_superuser" :icon="['fas', 'users']" :label="'Добавить преподавателя'" route_name="teacher-register" withLine/>
      <!-- <custom-router-link class="right" :icon="['fas', 'user']" :label="username" route_name="profile"/> -->
      <b-dropdown class='right-us' id="dropdown" variant="primary" text="Dropdown Button">
        <template v-slot:button-content>
          <font-awesome-icon :click="logout" :icon="['fas', 'user']" size='lg' /> {{ username }}
        </template>
        <b-dropdown-item v-if='authorized'>Профиль</b-dropdown-item>
        <b-dropdown-item v-else @click="redirect('login')">Войти</b-dropdown-item>
        <b-dropdown-item v-if='authorized' @click="logout">Выйти</b-dropdown-item>
      </b-dropdown>

      <b-dropdown class='left-us is_showed' id="dropdown-1" variant="primary" text="Dropdown Button">
        <template v-slot:button-content>
          <font-awesome-icon :icon="['fas', 'align-justify']" size='lg' />
        </template>
        <b-dropdown-item class="is_showed" v-if="role | is_superuser" @click="redirect('subjects')">Предметы</b-dropdown-item>
        <b-dropdown-item class="is_showed" v-if="role | is_superuser" @click="redirect('commands')">Команды</b-dropdown-item>
        <b-dropdown-item class="is_showed" v-if="role | is_superuser" @click="redirect('tests')">Тесты</b-dropdown-item>
        <b-dropdown-item class="is_showed" v-if="role | is_superuser" @click="redirect('devices')">Устройства</b-dropdown-item>
        <b-dropdown-item class="is_showed" v-if="role | is_superuser" @click="redirect('tests-results')">Результы</b-dropdown-item>
        <b-dropdown-item class="is_showed" v-if="role == '2' | is_superuser" @click="redirect('groups')">Группы</b-dropdown-item>
        <b-dropdown-item class="is_showed" v-if="role == '2' | is_superuser" @click="redirect('reports')">Отчеты</b-dropdown-item>
        <b-dropdown-item class="is_showed" v-if="is_superuser" @click="redirect('teacher-register')">Добавить</b-dropdown-item>
      </b-dropdown>

    </div>
    <div id="container">
      <router-view></router-view>
    </div>
    
    <div id="footer">
      <custom-router-link :icon="['fab', 'vk']" :label="''" route_name="index" :size="'2x'"/>
      <custom-router-link :icon="['fab', 'facebook']" :label="''" route_name="index" :size="'2x'"/>
      <custom-router-link :icon="['fab', 'instagram']" :label="''" route_name="index" :size="'2x'" />
    </div>
  </div>
</template>

<script>

// import API from './api';
import CustomRouterLink from './components/base/CustomRouterLink.vue';

export default {
  name: 'App',
  components: {
    CustomRouterLink,
  },
  data() {
    return {
      username: 'User',
      authorized: false,
      is_superuser: false,
      role: null
    }
  },
  mounted() {
    if (localStorage.username){
      this.username = localStorage.username
    }
    if (localStorage.token){
      this.authorized = true
    }
    if (localStorage.is_superuser){
      this.is_superuser = localStorage.is_superuser == 'true'
    }
    if (localStorage.role){
      this.role = localStorage.role
    }
  },
  methods: {
    logout(event) {
        event.preventDefault()
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('role')
        localStorage.removeItem('is_superuser')
        
        window.location.pathname = "/login"
      },
    getToken() {
      console.log(Boolean(localStorage.token))
      return Boolean(localStorage.token)
    },
    redirect(url_name) {
      this.$router.push({name: url_name})
    }

  },
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0px;  
  display: flex;
  background-color: rgb(224, 234, 238);
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-height: 100%;
  height: 100%;
}

#container {
  display: flex;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: .5em;
  box-shadow: 0 0 1em rgba(0, 0, 0, .5);
  background-color: white;
  padding-bottom: 10px;
  margin-bottom: 4rem;
}


#nav {
  padding: 30px;
  background-color: #304c67;
  margin-bottom: 20px;
  flex-wrap: wrap;
  min-height: 4rem;
}

.right {
  float: right;
}
.right-us {
  position:absolute !important;
  right:0px !important;
  top: 1.5rem;
}
.left-us {
  position:absolute !important;
  left:0px !important;
  top: 1.5rem;
}
.left {
  position: absolute;
  float: left;
  top: 15px;
  left: 15px;
}

.btn-primary { 
  background-color: #304c67 !important;
  border-color: #304c67 !important;
  color: wheat !important;
}

.btn-secondary { 
  background-color: #304c67 !important;
  border-color: #304c67 !important;
}

.dropdown-item {
  color: #304c67 !important;
}

.white {
  color: white;
}

#nav a, #footer a {
  font-weight: bold;
  color: wheat;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

h1 {
  color: #2c3e50;
  align-self: center;
  padding-bottom: 10px;
  padding-top: 10px;
}

#footer {
  bottom: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #304c67;
  height: 3rem;
  flex-shrink: 0;
  margin-top: -5rem
}

#footer * {
  padding-right: 10px;
}

.is_showed {
  display: none !important;
}

.is_showed .dropdown-toggle::after {
    display:none;
}

@media (max-width: 1040px) { 
    .hide {
        display: none !important;
    }
    .is_showed {
      display: inline-block !important;
    }

}
</style>
