<template>
    <div class="computerPage">
        <div class="banner">
            <img src="@/assets/incid_management.png" alt />
        </div>
        <mt-cell title="待办事项" is-link>
            <img slot="icon" src="@/assets/wb_todo.png" width="20" height="20" />
        </mt-cell>
         <mt-cell title="已办事项" is-link>
            <img slot="icon" src="@/assets/wb_done.png" width="20" height="20" />
        </mt-cell>
    </div>
</template>
<script>
export default {
    name: "computerPage",
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>
<style scoped>
.banner img {
    display: block;
    width: 100%;
}
</style>