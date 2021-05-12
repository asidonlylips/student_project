<template>
  <div id='as'>
      
    <b-form @submit="onSubmit" v-if="show">
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
                        <label class="font" for="input-default">Предметы:</label>
                    </b-col>
                    <b-col sm="10">
                        <multi-select :options="subjects"
                            class='ml-5'
                            :selected-options="items"
                            placeholder="select item"
                            required
                            @select="onSelect">
                        </multi-select>
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
import { MultiSelect } from 'vue-search-select'

  export default {
    name: 'TeacherRegister',
    components: {
        MultiSelect
    },
    data() {
      return {
        searchText: '', // If value is falsy, reset searchText & searchItem
        items: [],
        lastSelectItem: {},


        form: {
          username: null,
          password: null,
          teacher_subjects: null,
          email: null,
          first_name: null,
          last_name: null,
        },
        subjects: [],
        show: true
      } 
    },
    mounted() {
        this.getSubjects()
    },
    methods: {
        onSelect (items, lastSelectItem) {
        this.items = items
        this.lastSelectItem = lastSelectItem
        this.form.teacher_subjects = items.map(d => d.value)
      },
   
        async onSubmit(event) {
            event.preventDefault();
            console.log(this.items)
            if (this.form.group === null) {
                alert('Заполните группу (потом обработаю ошибку нормально)')
                return
            }
            try {
                let response = await API.post(this.$getConst('CREATE_TEACHER')(), this.form);
                this.$router.push( { name: 'subjects'} )
            } catch {
                alert('Oops... Smt going wrong')
            }        
        },
        async getSubjects() {
            try {
                let response = await API.get( this.$getConst('SUBJECT_URL')());
                response.data.map( (d) => this.subjects.push({value: d.id, text: d.name}))
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