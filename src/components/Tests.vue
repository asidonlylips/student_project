<template>
    <div id="subjects">
        <square-templates :router_name="'testDetail'" :items="subjectList" :title="getDefaultTitle()" :icon="['fa', 'check-circle']"></square-templates>
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
    props: {
        lectureId: {
            type: String,
            default: ''
        },
        labId: {
            type: String,
            default: ''
        },
        hideTitle: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            subjectList: [],
        }
    },
    mounted() {
        API.get( this.$getConst('TESTS_URL')(this.lectureId, this.labId)).then( (response) => {
            this.subjectList = response.data
        })
    },
    methods: {
        getDefaultTitle() {
            return this.hideTitle? '' : 'Тесты'
        }
    }

    
}
</script>
