<template>
    <div id="subjects">
        <div>
        <h1>Устройства</h1>
        <div id="filters" >
            <b-button class='ml-5'>Стенды</b-button>
        </div>
        <div id="subj-list">            
            <div class="sqLink" v-for="item in devicesList" :key="item.id" v-on:click='showModal(item)'>
                 <font-awesome-icon class="sm-icon" :icon="['fas', 'tablet']" :size="'2x'"  />{{ '  ' }} {{ item.name }}
            </div>
        </div>
    </div>
    <b-modal size="xl" class="modal-1" id="modal-1" :title="'Консоль ' + getTitle()">
        <vue-terminal
            :intro="'Нажмите Enter для начала работы'"
            :console-sign="getTitle() + '>'"
            style="color: white !important;"
            height="500px"
            allow-arbitrary
            @command="onCliCommand"
        />
    </b-modal>
        
    
    </div>
    
</template>

<script>

import API from '../api'
import VueTerminal from "../components/base/Terminal/VueTerminal"

export default {
    name: 'Devices',
    components: {
        // SquareTemplates,
        // Modal,
        VueTerminal,
    },
    data() {
        return {
            isModalVisible: false,
            devicesList: [],
            selectedDevice: null,
            isConnected: false,
            show: false,
            data: {
                command: null
            },
    
        }
    },
    methods: {
        showModal(device) {
            this.show = true
            this.selectedDevice = device
            this.$bvModal.show("modal-1")
        },
        getTitle() {
            if (this.selectedDevice) {
                return this.selectedDevice.name
            } else {
                return 'Имя устройства'
            }
        },
        async onCliCommand(data, resolve, reject) {
            if (data.text) {
                this.data.command = data.text
                this.sendCommand(data.text).then( (response) => {
                    setTimeout(() => {
                    resolve( `<pre>${response.data['result']}</pre>`);
                    }, 300);   
                }).catch( err => reject(err))            
            } else {
                resolve('result');
            }
        },
        sendCommand(text) {
            let response = API.post(this.$getConst('EXEC_COMMAND')(this.selectedDevice.id), this.data )
            return response
        },
    },
    mounted() {
        API.get( this.$getConst('DEVICES_URL')()).then( (response) => {
            this.devicesList = response.data
        })
    },
    
}
</script>
.modal-1 {
    width: 600px;
}

<style>
pre {
    color: white !important;
}


</style>
