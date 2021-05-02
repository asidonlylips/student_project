<template>
    <div>
        <h1>{{ title }}</h1>
        <div id="subj-list">            
            <div class="sqLink" v-for="item in items" :key="item.id" v-on:click="redirect(item.id)">
                 <font-awesome-icon class="sm-icon" :icon="icon" :size="'2x'"  />{{ '  ' }} {{ item.name }}
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
    },
    data() {
        return {

        }
    },
    methods: {
        redirect: function (itemId){
            this.$router.push({name: this.router_name, params: {id: itemId} })
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

}

#subj-list {
    display: flexbox;
    flex-wrap: wrap;
    padding-left: 10%;
    padding-right: 10%;
    flex-direction: row;
    margin: 0px;
}

.sm-icon {
    padding-right: 4px;
}

.sqLink:hover {
    -webkit-transform: scale(1.1);
    transition-duration: 0.5s;
}

.sqLink:hover .sm-icon {
    transform: rotate(30deg);
    transition-duration: 1s;
}

</style>