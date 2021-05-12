<template>
    <div id="subjects">
        <square-templates :router_name="'testDetail'" :items="subjectList" :title="'Тесты'" :icon="['fa', 'check-circle']"></square-templates>
    </div>
    
</template>

<script>

import SquareTemplates from './base/SquareTemplates.vue'
import API from '../api'

export default {
    name: 'Tests',
    components: {
        SquareTemplates
    },
    data() {
        return {
            subjectList: [],
        }
    },
    mounted() {
        API.get( this.$getConst('TESTS_URL')()).then( (response) => {
            this.subjectList = response.data
        })
    },

    
}
</script>
