<template>
    <div class="computerPage">
        <van-nav-bar title="工作台" fixed placeholder />
        <div class="banner">
            <img src="@/assets/img/incid_management.png" alt />
        </div>
        <van-cell title="待办事项" is-link to="/backlog">
            <img slot="icon" src="@/assets/img/wb_todo.png" class="icon" />
            <van-tag v-if="backlog.records>0" type="danger">{{backlog.records}}</van-tag>
        </van-cell>
        <van-cell title="已办事项" is-link to="/finished">
            <img slot="icon" src="@/assets/img/wb_done.png" class="icon" />
        </van-cell>
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
    computed: {
        backlog() {
            return this.$store.state.backlog;
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
.icon {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    padding-top: 2px;
}
</style>