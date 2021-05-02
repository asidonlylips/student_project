<template>
   <router-link :class="{ link: withLine }" :to="{name: route_name}"> <font-awesome-icon :icon="icon" :size="size"  /> {{ label }} </router-link> 
</template>
<script>
export default {
    name: 'CustomRouterLink',
    // props: ['route_name', 'icon', 'label', 'withLine'],
    props: {
        route_name: String,
        icon: Array,
        label: String,
        withLine: Boolean,
        size: {
            type: String,
            default: 'lg'
        }
    },
    methods: {
    },
};
</script>

<style scoped>
.white{
    color: white;
}
.link::before {
    content: "|";
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 60px;
}
</style>