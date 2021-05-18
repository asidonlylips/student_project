<template>
    <div class="s2" v-if="!isStarted"><b-button type="submit" variant="primary" @click="getTestInfo" class="mt-2">Начать тест!</b-button><br></div>
    <div class="s2" v-else-if="isEnded"><h2>Тест закончен</h2> <h3>Ваша оценка за тест: {{ mark }}</h3> </div>
    <div class="s3" v-else>
        <h1>Тест "{{ testName }}"</h1>
        <b-form >
        <div class='circle timer' :class="{'with-hours': estimatedTime > 3600}">
            <vue-countdown-timer
                @start_callback="startCallBack('Тест начат')"
                @end_callback="endCallBack('Время вышло!')"
                :start-time="startTime"
                :end-time="endTime"
                :interval="1000"
                :seconds-txt="''"
                label-position="begin">
                <template slot="countdown" slot-scope="scope">
                    <span v-if="estimatedTime > 3600">{{scope.props.hours}}</span><i v-if="estimatedTime > 3600">:</i>
                    <span>{{scope.props.minutes}}</span><i>{{scope.props.minutesTxt}}</i>
                    <span>{{scope.props.seconds}}</span><i>{{scope.props.secondsTxt}}</i>
                </template>
            </vue-countdown-timer>
        </div>
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
                @input="saveToState"
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
        }
    },
    async mounted() {
        let test_id = this.$route.params.id
        if (localStorage[`isStartedTest_${test_id}`]) {
            this.isStarted = true
            await this.getTestInfo()
            // this.form = localStorage[`isStartedTest_${test_id}`]
        }
    },
    methods: {
        async getTestInfo() {
            this.form = {}
            let test_id = this.$route.params.id
            try {
                let response = await API.get( this.$getConst('TEST_DETAIL_URL')(test_id))
                this.test = response.data
                this.testName = response.data.name
                let savedTest = localStorage[`isStartedTest_${test_id}`] ? JSON.parse(localStorage[`isStartedTest_${test_id}`]) : []
                response.data.questions.forEach(q => {
                    if (!localStorage[`isStartedTest_${test_id}`]){
                        this.form[`question_${q.id}`] = []
                    } else {
                        this.form[`question_${q.id}`] = [...Object.values(savedTest[`question_${q.id}`])]
                    }
                })
                this.estimatedTime = parseInt(response.data.estimated_time)
                this.endTime = (new Date).getTime() +  this.estimatedTime * 1000
                this.startTime = (new Date).getTime()
                localStorage.setItem(`isStartedTest_${test_id}`, JSON.stringify(this.form))
                this.isStarted = true
            } catch (er) {
                Vue.$toast.error(er);
            }
        },
    startCallBack: function(x) {
      console.log(x);
    },
    endCallBack: function(x) {
        this.subm();
    },
        async subm(e = false) {
            if (e) {
                e.preventDefault()
            }
            let test_id = this.$route.params.id
            try {
                let response = await API.put(this.$getConst('TEST_DETAIL_URL')(test_id)+'/', this.form)
                this.mark = response.data['mark']
                localStorage.removeItem(`isStartedTest_${test_id}`)
            this.isEnded = true
            } catch (er) {
                Vue.$toast.error(er);
            }
        },
        selectAnswer(question, answer) {
            var index = this.form[`question_${question.id}`].indexOf(answer.id);
            if (index !== -1){
                this.form[`question_${question.id}`].splice(index, 1);
            } else {
                this.form[`question_${question.id}`].push(answer.id)
            }
        },
        saveToState() {
            let test_id = this.$route.params.id
            localStorage.setItem(`isStartedTest_${test_id}`, JSON.stringify(this.form))
            localStorage[`isStartedTest_${test_id}`]
        }
    },
    
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
.timer {
    position: fixed;
    right: 3rem;
    font-size: 2rem;
    border: 2px solid #2b5c8a;
    background-color: rgba(78, 200, 221, 0.103);
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.with-hours {
    width: 8rem;
    height: 8rem;
}
@media (max-width: 720px) { 
    .timer {
        right: 10px;
        font-size: 1.5rem;
        width: 4rem;
        height: 4rem;
    }
    .with-hours {
        width: 6rem;
        height: 6rem;
    }

}
</style>