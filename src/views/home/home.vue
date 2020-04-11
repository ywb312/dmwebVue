<template>
    <div class="home">
        <router-view></router-view>
        <!-- 底部导航 -->
        <van-tabbar route active-color="#2585cf">
            <van-tabbar-item replace to="/home/homePage" icon="wap-home">主页</van-tabbar-item>
            <van-tabbar-item replace to="/home/computerPage" icon="chat" :badge="badge">工作台</van-tabbar-item>
            <van-tabbar-item replace to="/home/mePage" icon="manager">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data() {
        return {
            badge: ""
        };
    },
    created() {
        let self = this;
        this.$api.work
            .taskList({
                page: 1,
                rows: 10,
                session: window.localStorage["session_Id"]
            })
            .then(res => {
                self.$store.commit("setBacklog", res);
                this.badge = res.records;
            });
    },
    methods: {}
};
</script>