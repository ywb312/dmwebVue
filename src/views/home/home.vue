<template>
    <div class="home">
        <router-view></router-view>
        <!-- 底部导航 -->
        <van-tabbar placeholder route active-color="#2585cf">
            <van-tabbar-item to="/home/homePage" icon="wap-home">主页</van-tabbar-item>
            <van-tabbar-item
                to="/home/computerPage"
                icon="chat"
                :badge="backlog.records>0?backlog.records:''"
            >工作台</van-tabbar-item>
            <van-tabbar-item to="/home/mePage" icon="manager">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    created() {
        let self = this;
        this.$api.work
            .taskList({
                page: 1,
                rows: 10
            })
            .then(res => {
                self.$store.commit("setBacklog", res);
            });
    },
    methods: {},
    computed: {
        backlog() {
            return this.$store.state.backlog;
        }
    }
};
</script>