<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { Toast } from "vant";
export default {
    name: "App",
    computed: {
        // 路由加载控制显示隐藏
        ...mapState({
            isLoading: state => state.isLoading
        })
    },
    created() {
        // if (window.sessionStorage) {
        //     //在页面加载时读取sessionStorage里的状态信息
        //     if (sessionStorage.getItem("store")) {
        //         this.$store.replaceState(
        //             Object.assign(
        //                 {},
        //                 this.$store.state,
        //                 JSON.parse(sessionStorage.getItem("store"))
        //             )
        //         );
        //     }
        //     //在页面刷新时将vuex里的信息保存到sessionStorage里
        //     window.addEventListener("beforeunload", () => {
        //         sessionStorage.setItem(
        //             "store",
        //             JSON.stringify(this.$store.state)
        //         );
        //     });
        // }
    },
    methods: {
        loadingShow(a) {
            if (a) {
                Toast.loading({
                    message: "加载中...",
                    forbidClick: true,
                    duration: 0
                });
            } else {
                Toast.clear();
            }
        }
    },
    watch: {
        isLoading: function(nval) {
            // this.loadingShow(nval);
        }
    }
};
</script>
<style scoped>
#app {
    height: 100%;
}
</style>