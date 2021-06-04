<template>
    <div class="s2">
        <h1>Команды</h1>
        <div id="filters" class="right">
            <b-container fluid>
                <b-row class="my-1 mb-3" v-bind:style="{ width: 170 + '%' }">
                        <b-col sm="1">
                            <label class="font" for="input-default"><font-awesome-icon :icon="['fas', 'search']"  /></label>
                        </b-col>
                        <b-col sm="10">
                            <b-form-input v-model="search" id="input-default" placeholder="Поиск" />
                        </b-col>
                </b-row>
            </b-container>
        </div>
        <div class="s2" v-for="command in commands" :key="command.id">
            <b-button block v-b-toggle="'com' + command.id.toString()" class="mb-1 mt-1">{{command.command_name}}</b-button>
            <b-collapse :id="'com' + command.id.toString()" class="mt-2 col">
                <b-card >Описание: {{command.description}}</b-card>
                <h2 v-if="!!command.subcommands[0]">Подкоманды</h2>
                <div class="s2" v-for="subcommand  in command.subcommands" :key="subcommand.id">
                    <b-button block v-b-toggle="`subcom_${subcommand.id}`" class="mb-1 mt-1 subcom">{{subcommand.subcommand_name}}</b-button>
                    <b-collapse :id="`subcom_${subcommand.id}`" class="mt-2 col">
                        <b-card >Описание: {{subcommand.description}}</b-card>
                    </b-collapse>
                </div>

            </b-collapse>
        </div>
    </div>
    
</template>

<script>

import SquareTemplates from './base/SquareTemplates.vue';
import API from '../api';

export default {
    name: 'Commands',
    components: {
        // SquareTemplates
    },
    data() {
        return {
            commands: [],
            search: '',
        }
    },
    methods: {
        async getCommads() {
            let response = await API.get(this.$getConst('COMMANDS_URL')(this.search));
            this.commands = response.data
        }
    },

    mounted() {
        this.getCommads()
    },
    watch: {
        search: function (val) {
            this.getCommads()
        },
    }
}
</script>

<style>

.subcom {
    background-color: rgba(48, 54, 134, 0.582) !important;
}

</style>