<template>
    <div id="subjects"> 
        <square-templates :router_name="'tests-results-detail'" :items="testsResults" :title="'Предметы'" :icon="['fas', 'bookmark']">
            <div id="filters">
                <b-form-select v-model="selectedTest" :options="testsOptions"/>
                <b-form-select v-model="selectedGroup" :options="groupsOptions" />
                <b-form-select v-model="selectedStudent" :options="studentsOptions" />
                <br><br><br>
            </div>
        </square-templates>
    </div>
    
</template>

<script>

import SquareTemplates from './base/SquareTemplates.vue'
import API from '../api'

export default {
    name: 'TestsResults',
    components: {
        SquareTemplates
    },
    data() {
        return {
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
                this.studentsOptions.push({value: v.id, text: v.name})
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
            console.log(response)
            response.data.map((v) => {
                this.testsOptions.push({value: v.id, text: v.name})
            })
        },
        async getTestResults() {
            let group = this.selectedGroup ? this.selectedGroup & !this.selectedStudent : ''
            let test = this.selectedTest ? this.selectedTest : ''
            let student = this.selectedStudent ? this.selectedStudent : ''
            let response = await API.get(this.$getConst('TEST_RESULTS_URL')(test, group, student))
            this.testsResults = response.data
        }
    },
    async mounted() {
        await this.getStudents()
        await this.getGroups()
        await this.getTests()
        await this.getTestResults()
    }
    
}
</script>

<style>

#subjects {
    width: 100%; 
}




</style>
s