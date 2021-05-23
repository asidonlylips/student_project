<template>
    <div>
        <h1>{{ title }}</h1>
        <slot class="d-block"> </slot>
        <div id="subj-list">       
            <div class="sqLink" :class="{'sqLink2': !!item.completion_date}" v-for="item in items" :key="item.id" v-on:click="redirect(item.id)">
                <b-container>
                <b-row v-if='item.completion_date' class='rem1'>
                    <b-col>
                        {{ item.group }}
                    </b-col>
                    <b-col>{{ formatDate(new Date(item.completion_date)) }}</b-col>
                </b-row>
                <b-row v-if='item.completion_date'>
                    <b-col><font-awesome-icon class="sm-icon" :icon="icon" :size="'2x'"  />{{ '  ' }} {{ item.name }}</b-col>
                </b-row>
                <b-row v-if='item.completion_date' class='rem1'>
                    <b-col>
                        {{ item.student }}
                    </b-col>
                </b-row >
                <div v-else><font-awesome-icon class="sm-icon" :icon="icon" :size="'2x'"  />{{ '  ' }} {{ item.name }}</div>
                </b-container>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'SquareTemplates',
    props: {
        title: String,
        items: Array,
        icon: Array,
        router_name: String,
        click: Function
    },
    data() {
        return {

        }
    },
    methods: {
        redirect: function (itemId){
            if (this.click){
                this.click()
            } else {
                this.$router.push({name: this.router_name, params: {id: itemId} })
            }
        },
        formatDate(date) {

            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;

            var yy = date.getFullYear() % 100;
            if (yy < 10) yy = '0' + yy;

            return dd + '.' + mm + '.' + yy;
        }
    },
};
</script>

<style>
.sqLink {
    display: inline-flex !important;
    margin: 0px;
    width: 200px;
    height: 100px;
    background-color: rgba(182, 229, 238, 0.212);
    margin: 20px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    box-shadow: 6px -4px 1em 0px rgb(0 0 0 / 32%);
    flex-wrap: wrap;

}

#subj-list {
    display: flex !important;
    flex-wrap: wrap;
    padding-left: 10%;
    padding-right: 10%;
    width: 100%;
    flex-direction: row;
    margin: 0px;
}

.sm-icon {
    padding-right: 4px;
    align-self: center !important;
    justify-self: center !important;
}

.sqLink:hover {
    -webkit-transform: scale(1.1);
    transition-duration: 0.5s;
}

.sqLink:hover .sm-icon {
    transform: rotate(30deg);
    transition-duration: 1s;
}

.sqLink2 {
    width: 400px !important;
}

.top-l {
    align-self: flex-end;
}
.bot {
    align-self: flex-end;
}

.rem1 {
    font-size: 0.85rem !important;
}

</style>

<style scoped>
.row {
    width: 100% !important;
}
</style>