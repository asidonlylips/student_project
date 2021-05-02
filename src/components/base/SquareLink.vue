<template>
   <router-link class="link" :to="{name: route_name}"><font-awesome-icon :icon="icon"  />{{label}}</router-link> 
</template>
<script>
export default {
    name: 'CustomRouterLink',
    props: ['items'],
    data() {
    },
    methods: {
    }
};
</script>

<style scoped>
.white{
    color: white;
}
.link::before {
    content: " | ";
}
</style>