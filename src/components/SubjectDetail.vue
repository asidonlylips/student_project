<template>
    <div class="s2">
        <h1>Предмет "{{ subjectName }}"</h1>
        <div id="filters">
            <b-form-select v-model="selectedSemestr" :options="semesterOption"/>
            <b-form-select v-show="selectedSemestr" v-model="selectedFolder" :options="folderOption" />
        </div>
        <div id='cont'>
            <b-button block v-b-toggle="'collapse-lecture'" class="mb-1 mt-1">Лекции</b-button>
            <b-collapse id="collapse-lecture" class="mt-2 col">
                <b-card v-show="selectedSemestr" v-for="item in lectures" :key="item.id">
                    <b-link :href="item.file" target="_blank">{{item.name}}</b-link> | 
                    <b-link @click="selectLecture(item.id)">Тесты</b-link>

                </b-card>
                <b-card v-if="!selectedSemestr">Выберите семестр</b-card>
            </b-collapse>
            <b-button block v-b-toggle="'collapse-labs'" class="mb-1 mt-1">Лабораторные работы</b-button>
            <b-collapse id="collapse-labs" class="mt-2 col">
                <b-card v-show="selectedSemestr" v-for="item in labs" :key="item.id">
                    <b-link :href="item.file" target="_blank">{{item.name}}</b-link> | 
                    <b-link @click="selectLab(item.id)">Тесты</b-link>
                </b-card>
                <b-card v-if="!selectedSemestr">Выберите семестр</b-card>
            </b-collapse>
            <b-button block v-b-toggle="'collapse-files'" class="mb-1 mt-1">Файлы {{ folderName }}</b-button>
            <b-collapse id="collapse-files" class="mt-2 col">
                <b-card v-show="selectedFolder" v-for="item in files" :key="item.id"><b-link :href="item.file" target="_blank">{{item.name}}</b-link></b-card>
                <b-card v-if="!selectedSemestr">Выберите семестр</b-card>
                <b-card v-if="!selectedFolder">Выберите папку</b-card>
            </b-collapse>
        </div>
        <b-modal size="xl" class="modal-12" id="modal-12" :title="'Тесты'">
            <tests :lectureId='selectedLecture' :labId='selectedLab' hideTitle/>
        </b-modal>
    </div>
    
</template>

<script>

import SquareTemplates from './base/SquareTemplates.vue';
import API from '../api';
import Tests from './Tests.vue';

export default {
    name: 'SubjectDetail',
    components: {
        Tests
    },
    data() {
        return {
            subjectList: [],
            selectedSemestr: null,
            selectedFolder: null,
            folderName: '',
            semesterOption: [{value: null, text: 'Выберите семестр'}],
            folderOption: [{value: null, text: 'Выберите папку'}],
            subjectName: '',
            files: [],
            lectures: [],
            labs: [],
            selectedLab: '',
            selectedLecture: '',
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
        getLabs(semId) {
            API.get( this.$getConst('LABS_URL')(semId)).then( (response) => {
                this.labs = response.data
            })
        },
        getLecture(semId) {
            API.get( this.$getConst('LECTURES_URL' )(semId)).then( (response) => {
                this.lectures = response.data
            })
        },
        getFolders(subj_id) {
            API.get( this.$getConst('FOLDERS_URL')(subj_id)).then( (response) => {
                response.data.map((v) => {this.folderOption.push({value: v.id, text: v.name})})
            })
        },
        getFolderName(foldId) {
            return this.folderOption.filter((f) => f.value == foldId)[0].text
        },
        selectLab(id) {
            this.selectedLecture = ''
            this.selectedLab = id.toString()    
            this.$bvModal.show("modal-12")
        },
        selectLecture(id) {
            this.selectedLecture = id.toString()
            this.selectedLab = ''            
            this.$bvModal.show("modal-12")
        }
    },

    mounted() {
        let subj_id = this.$route.params.id
        this.getSubjectInfo(subj_id)
        this.getSemesters(subj_id)
    },
    watch: {
        selectedSemestr: function (val) {
            this.folderOption = [{value: null, text: 'Выберите папку'}]
                this.lectures = []
            this.selectedFolder = null     
            if (val) {
                this.getFolders(val)
                this.getLabs(val)
                this.getLecture(val)
            }
        },
        selectedFolder: function (val) {
            this.files = []
            this.folderName = ''
            if (val) {
                this.getFiles(val)
                this.folderName = `в папке ${this.getFolderName(val)}`
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
#cont {
    margin-top: 6rem;
    display: flex;
    flex-wrap: wrap;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 4rem;
}
.special-btn {
    margin: 0 0 0 1rem !important;
}
</style>