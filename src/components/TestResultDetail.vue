<template>
    <div class="s3" >
        <h1>Результат теста "{{ test.name }}" </h1>
        <h3>Ваша оценка за тест: {{ mark }}</h3> <br>
        <p class='right-a mr-2'>Ответ выбран верно</p> 
        <p class="inc-a mr-2"> Ответ выбран не верно</p>
        <p class="cor-a"> Верный ответ</p>
        <b-form >
        <b-container fuid>
            <b-form-group
            v-for="q, index in test.questions"
            :key="q.id"
            class="mb-5"
            label-size="lg"
            id="input-group-1"
            :label="index+1 + '. ' + q.question"
            label-for="input-1"
        >
        <div v-if="!!q.image">
            <b-img :src="'http://localhost:8000' + q.image" fluid class="mb-2"></b-img>
        </div>
            <b-row>
                <b-col  v-for="a in q.answers_res" :key='a.id' :class="{'right-a': a.is_checked & a.is_right, 'cor-a': !a.is_checked & a.is_right, 'inc-a': a.is_checked & !a.is_right}">
                    <input type='checkbox' disabled :checked='a.is_checked' >{{a.answer}}
                </b-col>
            </b-row>
            <hr>
        </b-form-group>
        </b-container>
        </b-form>
    </div>
    
</template>

<script>

import API from '../api';
import Vue from 'vue';

export default {
    name: 'TestResultDetail',
    components: {
    },
    props: {
    },
    data() {
        return {
            testName: '',
            files: [],
            lectures: [],
            labs: [],
            status: null,
            test: {questions: []},
            form: {},
            isStarted: false,
            isEnded: false,
            mark: '',
            startTime: (new Date).getTime()+100000000000,
            endTime: (new Date).getTime()+100000000000,
            estimatedTime: 0,
            rightAnswers: [],

        }
    },
    async mounted() {
        await this.getTestResultInfo()
    },
    methods: {
        async getTestResultInfo() {
            this.form = {}
            let test_id = this.$route.params.id
            try {
                let response = await API.get( this.$getConst('TEST_RESULT_URL')(test_id))
                console.log(response.data.test.questions)
                this.test = response.data.test
                this.testName = response.data.name
                this.mark = response.data.mark
                response.data.test.questions.forEach(q => {
                    this.form[`question_${q.id}`] = [...q.answers_res.map((a) => {
                        if (a.is_checked){
                            return a.answer
                        }
                    })]
                })
            } catch (er) {
                Vue.$toast.error(er);
            }
        },
    },
    
}
</script>

<style>
.right-a {
    border: 1px solid rgba(0, 128, 0, 0.644);
    display: inline-block !important;
    background-color: rgba(28, 185, 23, 0.356);
}
.inc-a {
    border: 1px solid rgba(128, 51, 0, 0.644);
    display: inline-block !important;
    background-color: rgba(185, 28, 23, 0.356);
}
.cor-a {
    border: 1px solid rgba(0, 45, 128, 0.555);
    display: inline-block !important;
    background-color: rgba(39, 23, 185, 0.356);
}
</style>