<template>
    <div class="s2">
        <h1>Предмет "{{ subjectName }}"</h1>
        <div id="filters">
            <b-form-select v-model="selectedSemestr" :options="semesterOption"/>
            <b-form-select v-show="selectedSemestr" v-model="selectedFolder" :options="folderOption"/>
        </div>
        <!-- <square-templates :items="subjectList" :title="'Предметы'" :icon="['fas', 'bookmark']"></square-templates> -->
        <div id='pre'>

        <pre> {{files}} </pre>
        </div>
    </div>
    
</template>

<script>

import SquareTemplates from './base/SquareTemplates.vue'
import API from '../api'

export default {
    name: 'SubjectDetail',
    components: {
        // SquareTemplates
    },
    props: {
    },
    data() {
        return {
            subjectList: [],
            selectedSemestr: null,
            selectedFolder: null,
            semesterOption: [{value: null, text: 'Выберите семестр'}],
            folderOption: [{value: null, text: 'Выберите папку'}],
            subjectName: '',
            files: []
        }
    },
    methods: {
        getSubjectInfo(subj_id) {
            API.get( this.$getConst('SUBJECT_DETAIL_URL')(subj_id)).then( (response) => {
            this.subjectName = response.data.name
            });
        },
        getSemesters(subj_id) {
            API.get( this.$getConst('SEMESTERS_URL')(subj_id)).then( (response) => {
                response.data.map((v) => {this.semesterOption.push({value: v.id, text: v.name})})
            })
        },
        getFiles(fold_id) {
            API.get( this.$getConst('FILES_URL')(fold_id)).then( (response) => {
                this.files = response.data
            })
        },
        getFolders(subj_id) {
            API.get( this.$getConst('FOLDERS_URL')(subj_id)).then( (response) => {
                response.data.map((v) => {this.folderOption.push({value: v.id, text: v.name})})
            })
        }
    },

    mounted() {
        let subj_id = this.$route.params.id
        this.getSubjectInfo(subj_id)
        this.getSemesters(subj_id)
    },
    watch: {
        selectedSemestr: function (val) {
            if (!val) {
                this.selectedFolder = null
                this.folderOption = [{value: null, text: 'Выберите папку'}]
            }
            else {
                this.getFolders(val)
            }
        },
        selectedFolder: function (val) {
            if (!val) {
                this.files = []
            }
            else {
                this.getFiles(val)
            }
        }

    }
    
}
</script>

<style>

.s2 {
    width: 100% !important;
}
#filters > * {
    display: inline;
    width: 20%;
    min-width: 200px;
    float: left;
    margin-left: 20px;
}
#pre {
    margin-top: 100px;
}




</style>
