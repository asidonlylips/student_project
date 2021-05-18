<template>
    <div class="s2" v-if="!isStarted"><b-button type="submit" variant="primary" @click="getTestInfo" class="mt-2">Начать тест!</b-button><br></div>
    <div class="s2" v-else-if="isEnded"><h2>Тест закончен</h2> <h3>Ваша оценка за тест: {{ mark }}</h3> </div>
    <div class="s3" v-else>
        <h1>Тест "{{ testName }}"</h1>
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
            <b-form-checkbox-group
                v-model="form[`question_${q.id}`]"
                :options="q.answers"
                class="mb-3 inline mt-2"
                value-field="answer"
                text-field="answer"
                >
            </b-form-checkbox-group>
            <hr>
        </b-form-group>
        </b-container>
        <b-button type="submit" variant="primary" @click="subm">Завершить тест</b-button><br>
        </b-form>
    </div>
    
</template>

<script>

import API from '../api';
import Vue from 'vue';

export default {
    name: 'TestDetail',
    components: {
        // SquareTemplates
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
            test: null,
            form: {},
            isStarted: false,
            isEnded: false,
            mark: ''
        }
    },
    mounted() {        
        let test_id = this.$route.params.id
        if (localStorage[`isStartedTest_${test_id}`]) {
            this.isStarted = true
            this.getTestInfo()
        }
    },
    methods: {
        async getTestInfo() {
            this.form = {}
            let test_id = this.$route.params.id
            try {
                let response = await API.get( this.$getConst('TEST_DETAIL_URL')(test_id))
                console.log(response)
                this.test = response.data
                this.testName = response.data.name
                response.data.questions.forEach(q => {
                    this.form[`question_${q.id}`] = []
                })
                this.isStarted = true
                localStorage.setItem(`isStartedTest_${test_id}`, true)
            } catch (er) {
                Vue.$toast.error(er.response.data.message);
            }
        },
        async subm(e) {
            e.preventDefault()
            let test_id = this.$route.params.id
            let response = await API.put(this.$getConst('TEST_DETAIL_URL')(test_id)+'/', this.form)
            this.mark = response.data['mark']
            localStorage.removeItem(`isStartedTest_${test_id}`)
            this.isEnded = true
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
    watch: {
        status: function (val) {
            console.log(val)
        },

    }
    
}
</script>

<style>

.s3 {
    width: 100% !important;
    display: block !important;
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
.col-form-label-lg {
    font-size: 2rem !important;
}
.custom-control-label {
    font-size: 1.2rem !important;
}
</style>