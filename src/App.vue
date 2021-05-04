<template>
 <div id="app">
    <div id="nav">
      <custom-router-link class="left" :icon="['fas', 'university']" :label="'БРУ'" route_name="index" :size="'3x'" />
      <custom-router-link :icon="['fas', 'book']" :label="'Предметы'" route_name="subjects" :style="{'padding-left': '100px'}" />
      <custom-router-link :icon="['fas', 'terminal']" :label="'Команды'" route_name="commands" withLine/>
      <custom-router-link :icon="['fas', 'search']" :label="'Поиск команды'" route_name="searchCommands" withLine/>
      <custom-router-link :icon="['fas', 'robot']" :label="'Устройства'" route_name="devices" withLine/>
      <custom-router-link :icon="['fas', 'users']" :label="'Группы'" route_name="groups" withLine/>
      <!-- <custom-router-link class="right" :icon="['fas', 'user']" :label="username" route_name="profile"/> -->
      <b-dropdown class="right" id="dropdown" variant="primary" text="Dropdown Button">
        <template v-slot:button-content>
          <font-awesome-icon :click="logout" :icon="['fas', 'user']" size='lg' /> {{ username }}
        </template>
        <b-dropdown-item v-if='authorized'>Профиль</b-dropdown-item>
        <b-dropdown-item v-else @click="redirect">Войти</b-dropdown-item>
        <b-dropdown-item v-if='authorized' @click="logout">Выйти</b-dropdown-item>
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
      authorized: false
    }
  },
  mounted() {
    console.log(localStorage.username)
    if (localStorage.username){
      this.username = localStorage.username
    }
    if (localStorage.token){
      this.authorized = true

    }
  },
  methods: {
    logout(event) {
        event.preventDefault()
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        
        window.location.pathname = "/login"
      },
    getToken() {
      console.log(Boolean(localStorage.token))
      return Boolean(localStorage.token)
    },
    redirect() {
      this.$router.push({name: 'login'})
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
}

.right {
  float: right;
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

</style>
