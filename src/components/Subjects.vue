<template>
    <div id="subjects">
        <square-templates :router_name="'subjectDetail'" :items="subjectList" :title="'Предметы'" :icon="['fas', 'bookmark']"></square-templates>
    </div>
    
</template>

<script>

import SquareTemplates from './base/SquareTemplates.vue'
import API from '../api'

export default {
    name: 'Subjects',
    components: {
        SquareTemplates
    },
    data() {
        return {
            subjectList: [],
        }
    },
    mounted() {
        API.get( this.$getConst('SUBJECT_URL')()).then( (response) => {
            this.subjectList = response.data
        })
    }
    
}
</script>

<style>

#subjects {
    width: 100%; 
}




</style>
