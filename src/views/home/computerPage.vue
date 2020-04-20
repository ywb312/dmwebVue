<template>
    <div class="computerPage">
        <mt-header title="工作台"></mt-header>
        <div class="banner">
            <img src="@/assets/img/incid_management.png" alt />
        </div>
        <mt-cell title="待办事项" is-link to="/backlog">
            <img slot="icon" src="@/assets/img/wb_todo.png" width="20" height="20" />
            <van-tag v-if="backlog.records>0" type="danger">{{backlog.records}}</van-tag>
        </mt-cell>
        <mt-cell title="已办事项" is-link to="/finished">
            <img slot="icon" src="@/assets/img/wb_done.png" width="20" height="20" />
        </mt-cell>
    </div>
</template>
<script>
export default {
    name: "computerPage",
    data() {
        return {
            badge: 0
        };
    },
    computed:{
        backlog(){
            return this.$store.state.backlog
        }
    }
};
</script>
<style scoped>
.banner img {
    display: block;
    width: 100%;
}
</style>