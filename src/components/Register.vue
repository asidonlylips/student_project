<template>
  <div id='as'>
      
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <h1>Регистрация</h1><br>
            <b-container fluid>
                <b-row class="my-1">
                    <b-col sm="2">
                        <label class="font" for="input-default">Username:</label>
                    </b-col>
                    <b-col sm="10">
                        <b-form-input required v-model="form.username" id="input-default" class="ml-5" placeholder="Введите имя пользователя" />
                    </b-col>
                </b-row>
                
                <b-row class="my-1">
                    <b-col sm="2">
                        <label class="font" for="input-default">Пароль:</label>
                    </b-col>
                    <b-col sm="10">
                        <b-form-input required v-model="form.password" id="input-default" class="ml-5" type="password" placeholder="Введите пароль" />
                    </b-col>
                </b-row>
                
                <b-row class="my-1">
                    <b-col sm="2">
                        <label class="font" for="input-default">Имя:</label>
                    </b-col>
                    <b-col sm="10">
                        <b-form-input required v-model="form.first_name" id="input-default" class="ml-5" placeholder="Введите имя" />
                    </b-col>
                </b-row>

                <b-row class="my-1">
                    <b-col sm="2">
                        <label class="font" for="input-default">Фамилия:</label>
                    </b-col>
                    <b-col sm="10">
                        <b-form-input required v-model="form.last_name" id="input-default" class="ml-5" placeholder="Введите фамилю" />
                    </b-col>
                </b-row>
                
                <b-row class="my-1">
                    <b-col sm="2">
                        <label class="font" for="input-default">Email:</label>
                    </b-col>
                    <b-col sm="10">
                        <b-form-input required v-model="form.email" id="input-default" class="ml-5" type="email" placeholder="Введите email" />
                    </b-col>
                </b-row>

                <b-row class="my-1">
                    <b-col sm="2">
                        <label class="font" for="input-default">Группа:</label>
                    </b-col>
                    <b-col sm="10">
                        <model-select
                            required
                            class="ml-5"
                            :options="groups"
                            v-model="form.group"
                            :isError='form.group === null'
                            placeholder="Выберите группу">
                        </model-select>
                    </b-col>
                </b-row>
            </b-container>
        

        <br>
        <b-button type="submit" variant="primary">Зарегистрироваться</b-button><br><br>
    </b-form>
  </div>
</template>

<script>
import API from '../api'
import axios from 'axios'
import { ModelSelect } from 'vue-search-select'

  export default {
    name: 'Register',
    components: {
        ModelSelect
    },
    data() {
      return {
        form: {
          username: null,
          password: null,
          group: null,
          email: null,
          first_name: null,
          last_name: null,
        },
        fields: ['name'],
        groups: [{value: null, text: 'Выберите группу'}],
        show: true
      } 
    },
    mounted() {
        this.getGroups()
    },
    methods: {
      async onSubmit(event) {
        event.preventDefault();
        if (this.form.group === null) {
            alert('Заполните группу (потом обработаю ошибку нормально)')
        }
        try {
            let response = await axios.post('http://localhost:8000/api/' + this.$getConst('REGISTER_URL')(), this.form);
            this.$router.push( { name: 'login'} )
        } catch {
            alert('Oops... Smt going wrong')
        }        
      },
      async getGroups() {
        try {
            let response = await axios.get('http://localhost:8000/api/' + this.$getConst('GROUPS_URL')());
            response.data.map( (d) => this.groups.push({value: d.id, text: d.name}))
          } catch {
            alert('Oops... Smt going wrong with groups')
        } 
      },
    },
  }
</script>

<style>
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
.row {
    justify-content: center !important;
    align-items: center !important;
}
.font {
    font-size: 1.3rem;
}
.ui.dropdown.error>.menu>.item {
    color: black !important;
}
</style>