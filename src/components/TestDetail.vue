<template>
    <div class="s2">
        <h1>Тест "{{ testName }}"</h1>
        <b-form >
        <h1>Войдите в систему</h1><br>

        <b-container fluid>
        <b-row class="my-1">
            <b-form-group
            v-for="q, index in test.questions"
            :key="q"
            class="mb-5"
            id="input-group-1"
            :label="index+1 + '. ' + q.question"
            label-for="input-1"
        >
        <div v-if="!!q.image">
            <b-img :src="'localhost:8000' + q.image"></b-img>
        </div>
            <b-form-checkbox-group

                v-model="form[`question_${q.id}`]"
                :options="q.answers"
                class="mb-3 inline"
                value-field="id"
                text-field="answer"
                >
            </b-form-checkbox-group>
        </b-form-group>
        </b-row>
        </b-container>
        <b-button type="submit" variant="primary" @click="subm">Завершить тест</b-button><br>
        </b-form>
    </div>
    
</template>

<script>

import API from '../api';

export default {
    name: 'TestDetail',
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
            folderName: '',
            semesterOption: [{value: null, text: 'Выберите семестр'}],
            folderOption: [{value: null, text: 'Выберите папку'}],
            testName: '',
            files: [],
            lectures: [],
            labs: [],
            status: null,
            test: null,
            form: {},
        }
    },
    methods: {
        getTestInfo(id) {
            this.form = {}
            API.get( this.$getConst('TEST_DETAIL_URL')(id)).then( (response) => {
                this.test = response.data
                this.testName = response.data.name
                response.data.questions.forEach(q => {
                    this.form[`question_${q.id}`] = []
                })
                console.log(this.form)
            })
        },
        subm(e) {
            e.preventDefault()
            console.log(this.form)
        },
        selectAnswer(question, answer) {
            var index = this.form[`question_${question.id}`].indexOf(answer.id);
            if (index !== -1){
                this.form[`question_${question.id}`].splice(index, 1);
            } else {
                this.form[`question_${question.id}`].push(answer.id)
            }

        }
    },

    mounted() {
        let test_id = this.$route.params.id
        this.getTestInfo(test_id)
    },
    watch: {
        status: function (val) {
            console.log(val)
        },

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
.inline {
    display: inline !important;
    margin: 10px;
}
</style>