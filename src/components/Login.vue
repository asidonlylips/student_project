<template>
  <div id='as'>
      
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <h1>Войдите в систему</h1><br>
      <b-form-group
        id="input-group-1"
        label="Имя пользователя:"
        label-for="input-1"
        description="username"
      >
        <b-form-input
          id="input-1"
          v-model="form.username"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Пароль:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Введите пароль"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Войти</b-button><br>
      <b-button type="reset" variant="link">Зарегистрироваться</b-button>
    </b-form>
  </div>
</template>

<script>
import API from '../api'
import axios from 'axios'

  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        show: true
      } 
    },
    methods: {
      async onSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8000/api/' + this.$getConst('LOGIN_URL')(), this.form).then( (response)  => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.email)
          this.$root.username = response.data.email
          this.$emit.username = response.data.email
          window.location.pathname = "/subjects"
        })
      },

      onReset(event) {
        event.preventDefault()
        this.$router.push({ name : 'register' })
      }
    }
  }
</script>

<style scoped>
#as {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
}
h1 {
    display: block !important;
}
</style>