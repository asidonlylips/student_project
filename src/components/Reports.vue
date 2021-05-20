<template>
    <div class="s2">
          <b-tabs content-class="mt-3" justified>
            <b-tab title="Посещения на текущий момент" active>
                
               <div id="filters">
                    <b-form-select v-model="selectedGroup" :options="groupsOptions" />
                    <br><br><br>
                </div>
                <b-table striped hover :items="studentsToDisplay"></b-table>

            </b-tab>
            <b-tab title="Результаты тестов">
                <div id="filters">
                    <b-form-select v-model="selectedTest" :options="testsOptions"/>
                    <b-form-select v-model="selectedGroup" :options="groupsOptions" />
                    <b-form-select v-model="selectedStudent" :options="studentsOptions" />
                    <br><br><br>
                </div>
                <b-table striped hover :items="testsToDisplay"></b-table>

            </b-tab>
        </b-tabs>
    </div>
</template>


<script>
import API from '../api'
import axios from 'axios'
import Vue from 'vue';

  export default {
    name: 'Reports',
    components: {
        // SquareTemplates
    },
    data() {
      return {
            studentsToDisplay: [],
            testsToDisplay: [],
            testsResults: [],
            selectedTest: null,
            selectedStudent: null,
            selectedGroup: null,
            testsOptions: [],
            studentsOptions: [],
            groupsOptions: [],

      } 
    },
    methods: {
        async getStudents() {
            let group = this.selectedGroup ? this.selectedGroup : ''
            let response = await API.get(this.$getConst('STUDENTS_URL')(group))
            this.studentsOptions = [{ value: null, text: 'Выберите студента'}]
            response.data.map((v) => {
                this.studentsOptions.push({value: v.id, text: `${v.first_name } ${v.last_name}`})
            })
        },
        async getGroups() {
            let response = await API.get(this.$getConst('GROUPS_URL')())
            this.groupsOptions = [{ value: null, text: 'Выберите группу'}]
            response.data.map((v) => {
                this.groupsOptions.push({value: v.id, text: v.name})
            })
        },
        async getTests() {
            let response = await API.get(this.$getConst('TESTS_URL')())
            this.testsOptions = [{ value: null, text: 'Выберите тест'}]
            response.data.map((v) => {
                this.testsOptions.push({value: v.id, text: v.name})
            })
        },
        async getTestResults() {
            this.testsToDisplay = []
            let group = this.selectedGroup ? this.selectedStudent ? '' : this.selectedGroup : ''
            let test = this.selectedTest ? this.selectedTest : ''
            let student = this.selectedStudent ? this.selectedStudent : ''
            let response = await API.get(this.$getConst('TEST_RESULTS_URL')(test, group, student))
            
            response.data.map((s, index) => {
                let testName = this.testsOptions.filter(g => g.value == s.test)[0].text
                this.testsToDisplay.push(
                    {
                        '#': index +1,
                        'Студент': s.student,
                        'Тест': testName,
                        'Оценка': s.mark,
                        'Дата выполнения': `${new Date(s.completion_date).toLocaleDateString()} ${new Date(s.completion_date).toLocaleTimeString()} `,
                        
                    }
                )
            })
        },
        async getStidentsToDisplay() {
            this.studentsToDisplay = []
            let group = this.selectedGroup ? this.selectedGroup : ''
            let response = await API.get(this.$getConst('STUDENTS_URL')(group))
            response.data.map((s, index) => {
                let groupName = this.groupsOptions.filter(g => g.value == s.group)[0].text
                this.studentsToDisplay.push(
                    {
                        '#': index +1,
                        Имя: `${s.first_name } ${s.last_name}`,
                        Группа: groupName ? groupName : '',
                        'Последний вход': `${new Date(s.last_seen).toLocaleDateString()} ${new Date(s.last_seen).toLocaleTimeString()} `,
                        'Онлайн': s.is_online ? "Да" : "Нет",
                        _cellVariants: { 'Онлайн': s.is_online ? '': 'danger' }
                        
                    }
                )
            })
        },

    },
    
    async mounted() {
        await this.getStudents()
        await this.getGroups()
        await this.getTests()
        await this.getTestResults()
        await this.getStidentsToDisplay()
    },
    watch: {
        selectedGroup: function (val) {
            this.getStidentsToDisplay()
            this.getTestResults()
        },
        selectedTest: function (val) {
            this.getTestResults()
        },
        selectedStudent: function (val) {
            this.getTestResults()
        },
        
    }
  }
</script>